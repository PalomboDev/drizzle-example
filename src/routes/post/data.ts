import { eq } from "drizzle-orm";
import type { DB } from "../../db";
import { type PostsInsert, posts } from "../../db/schema";

export function getPostQuery(
	db: DB,
	id: string,
	includeAuthor: boolean = false,
	includeComments: boolean = false,
) {
	const shouldIncludeAuthor = includeAuthor === true ? true : undefined;
	const shouldIncludeComments = includeComments === true ? true : undefined;

	return db.query.posts.findFirst({
		where: eq(posts.id, Number(id)),
		with: {
			author: shouldIncludeAuthor,
			comments: shouldIncludeComments,
		},
	});
}

export function getPostsQuery(db: DB) {
	return db.query.posts.findMany();
}

export function createPostInsert(db: DB, data: PostsInsert) {
	return db.insert(posts).values(data).returning();
}
