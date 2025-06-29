import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "1234",
  database: process.env.PG_DATABASE || "service",
  ssl: {
    rejectUnauthorized: false,
  },
});
