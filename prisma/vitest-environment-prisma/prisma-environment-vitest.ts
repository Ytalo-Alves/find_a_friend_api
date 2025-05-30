import "dotenv/config";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";
import { DatabaseUrlError } from "@/errors/database-url.error";

const prisma = new PrismaClient

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new DatabaseUrlError();
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  transformMode: "ssr",
  name: "prisma",
  async setup() {
    const schema = randomUUID();
    const databaseUrl = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await prisma.$disconnect()
      },
    };
  },
};