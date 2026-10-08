import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "taskflow",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export default prisma;