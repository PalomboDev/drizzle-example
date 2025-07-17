import { type Context, Hono } from "hono";
import type { DB } from "../db";

type Bindings = {
	db: DB;
};

export function createApp() {
	return new Hono<{ Bindings: Bindings }>();
}

export function returnErrorCause(c: Context, error: unknown) {
	const e = error as { cause: unknown };

	console.error(error);

	return c.json(
		{
			error: e?.cause ?? "Unknown error",
		},
		500,
	);
}
