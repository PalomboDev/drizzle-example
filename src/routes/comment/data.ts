import { eq } from "drizzle-orm";
import type { DB } from "../../db";
import { type CommentsInsert, comments } from "../../db/schema";

export function getCommentQuery(
	db: DB,
	id: string,
	includePost: boolean = false,
	includeAuthor: boolean = false,
) {
	const shouldIncludePost = includePost === true ? true : undefined;
	const shouldIncludeAuthor = includeAuthor === true ? true : undefined;

	return db.query.comments.findFirst({
		where: eq(comments.id, Number(id)),
		with: {
			post: shouldIncludePost,
			author: shouldIncludeAuthor,
		},
	});
}

export function getCommentsQuery(db: DB) {
	return db.query.posts.findMany();
}

export function createCommentInsert(db: DB, data: CommentsInsert) {
	return db.insert(comments).values(data).returning();
}
