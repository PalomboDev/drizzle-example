import { postsInsertSchema } from "../../db/schema";
import { createApp, returnErrorCause } from "../../lib/hono";
import { createPostInsert, getPostQuery, getPostsQuery } from "./data";

const app = createApp();

app.get("/", async (c) => {
	try {
		const data = await getPostsQuery(c.env.db);

		return c.json(data);
	} catch (e) {
		return returnErrorCause(c, e);
	}
});

app.get("/:id", async (c) => {
	const { id } = c.req.param();
	const { includeAuthor, includeComments } = c.req.query();

	try {
		const data = await getPostQuery(c.env.db, id, includeAuthor === "true", includeComments === "true");

		return c.json(data);
	} catch (e) {
		return returnErrorCause(c, e);
	}
});

app.post("/", async (c) => {
	const body = await c.req.json();
	const { data, error } = postsInsertSchema.safeParse(body);

	if (error) {
		return c.json(error, 400);
	}

	try {
		const newData = (await createPostInsert(c.env.db, data))[0];

		return c.json(newData);
	} catch (e) {
		return returnErrorCause(c, e);
	}
});

export default app;
