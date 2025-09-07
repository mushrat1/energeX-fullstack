import request from "supertest";
import express from "express";

const app = express();
app.get("/cache/posts", (_req, res) => res.json([]));

describe("cache endpoints", () => {
  it("GET /cache/posts returns 200", async () => {
    const res = await request(app).get("/cache/posts").expect(200);
    expect(res.body).toEqual([]);
  });
});
