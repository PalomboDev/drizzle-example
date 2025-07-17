import { commentsInsertSchema } from "../../db/schema";
import { createApp, returnErrorCause } from "../../lib/hono";
import { createCommentInsert, getCommentQuery, getCommentsQuery } from "./data";

const app = createApp();

app.get("/", async (c) => {
	try {
		const data = getCommentsQuery(c.env.db);

		return c.json(data);
	} catch (e) {
		return returnErrorCause(c, e);
	}
});

app.get("/:id", async (c) => {
	const { id } = c.req.param();
	const { includePost, includeAuthor } = c.req.query();

	try {
		const data = await getCommentQuery(c.env.db, id, includePost === "true", includeAuthor === "true");

		return c.json(data);
	} catch (e) {
		return returnErrorCause(c, e);
	}
});

app.post("/", async (c) => {
	const body = await c.req.json();
	const { data, error } = commentsInsertSchema.safeParse(body);

	if (error) {
		return c.json(error, 400);
	}

	try {
		const newData = (await createCommentInsert(c.env.db, data))[0];

		return c.json(newData);
	} catch (e) {
		return returnErrorCause(c, e);
	}
});

export default app;
