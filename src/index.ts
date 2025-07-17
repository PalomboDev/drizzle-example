import { serve } from "@hono/node-server";
import { db } from "./db/index.js";
import { createApp } from "./lib/hono.js";
import CommentApp from "./routes/comment";
import PostApp from "./routes/post";
import UserApp from "./routes/user";

const app = createApp();

app.use(async (c, next) => {
	c.env.db = db;
	await next();
});

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/comment", CommentApp);
app.route("/post", PostApp);
app.route("/user", UserApp);

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
