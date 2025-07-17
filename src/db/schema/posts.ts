import { relations } from "drizzle-orm";
import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import { comments } from "./comments";
import { users } from "./users";

export const posts = pgTable(
	"posts",
	(d) => ({
		id: d.serial("id").primaryKey(),
		title: d.text("title").notNull(),
		content: d.text("content").notNull(),
		author: d
			.uuid("author")
			.notNull()
			.references(() => users.id),
		created_at: d.timestamp("created_at").notNull().defaultNow(),
	}),
	(t) => [uniqueIndex("title_idx").on(t.title, t.author)],
);

export const postsRelations = relations(posts, ({ one, many }) => ({
	author: one(users, {
		fields: [posts.author],
		references: [users.id],
	}),
	comments: many(comments),
}));

export const postsInsertSchema = createInsertSchema(posts);

export type PostsInsert = z.infer<typeof postsInsertSchema>;
