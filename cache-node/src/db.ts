import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USERNAME || "app",
  password: process.env.DB_PASSWORD || "app",
  database: process.env.DB_DATABASE || "energex",
  connectionLimit: 10
});
