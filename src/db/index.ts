import "dotenv/config";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export type Schema = typeof schema;

export const db: NodePgDatabase<typeof schema> = drizzle(
	process.env.DATABASE_URL as string,
	{ schema },
);

export type DB = typeof db;
