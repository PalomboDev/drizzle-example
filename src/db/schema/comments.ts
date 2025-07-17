import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import { posts } from "./posts";
import { users } from "./users";

export const comments = pgTable("comments", (d) => ({
	id: d.serial("id").primaryKey(),
	author: d
		.uuid("author")
		.notNull()
		.references(() => users.id),
	post: d
		.integer("post")
		.notNull()
		.references(() => posts.id),
	content: d.text("content").notNull(),
	created_at: d.timestamp("created_at").notNull().defaultNow(),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
	author: one(users, {
		fields: [comments.author],
		references: [users.id],
	}),
	post: one(posts, {
		fields: [comments.post],
		references: [posts.id],
	}),
}));

export const commentsInsertSchema = createInsertSchema(comments);

export type CommentsInsert = z.infer<typeof commentsInsertSchema>;
