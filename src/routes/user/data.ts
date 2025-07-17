import { eq } from "drizzle-orm";
import type { DB } from "../../db";
import { type UsersInsert, users } from "../../db/schema";

export function getUserQuery(
	db: DB,
	id: string,
	includePosts: boolean = false,
	includeComments: boolean = false,
) {
	const shouldIncludePosts = includePosts === true ? true : undefined;
	const shouldIncludeComments = includeComments === true ? true : undefined;

	return db.query.users.findFirst({
		where: eq(users.id, id),
		with: {
			posts: shouldIncludePosts,
			comments: shouldIncludeComments,
		},
	});
}

export function getUsersQuery(db: DB) {
	return db.query.users.findMany();
}

export function createUserInsert(db: DB, data: UsersInsert) {
	return db.insert(users).values(data).returning();
}
