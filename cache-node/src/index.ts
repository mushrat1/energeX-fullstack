import "dotenv/config";
import express, { Request, Response } from "express";
import { redis } from "./redis.js";
import { pool } from "./db.js";

const app = express();
const PORT = 4000;

app.get("/cache/posts", async (_req: Request, res: Response) => {
  const cacheKey = "posts:all";
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.type("application/json").send(cached);
  }
  const [rows] = await pool.query("SELECT p.id, p.title, p.content, p.created_at, u.id as user_id, u.name, u.email FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC");
  await redis.setex(cacheKey, 60, JSON.stringify(rows));
  res.json(rows);
});

app.get("/cache/posts/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const cacheKey = `posts:${id}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.type("application/json").send(cached);
  }
  const [rows] = await pool.query("SELECT p.id, p.title, p.content, p.created_at, u.id as user_id, u.name, u.email FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ? LIMIT 1", [id]);
  const post = Array.isArray(rows) && rows.length ? rows[0] : null;
  if (!post) return res.status(404).json({ message: "Not found" });
  await redis.setex(cacheKey, 60, JSON.stringify(post));
  res.json(post);
});

app.listen(PORT, () => {
  console.log(`Cache server running on http://0.0.0.0:${PORT}`);
});
