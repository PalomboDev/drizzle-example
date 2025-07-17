import { relations } from "drizzle-orm";
import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import { comments } from "./comments";
import { posts } from "./posts";

export const users = pgTable(
	"users",
	(d) => ({
		id: d.uuid("uuid").defaultRandom().primaryKey(),
		email: d.text("email").notNull(),
		name: d.text("name").notNull(),
		created_at: d.timestamp("created_at").notNull().defaultNow(),
	}),
	(t) => [uniqueIndex("email_idx").on(t.email)],
);

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
	comments: many(comments),
}));

export const usersInsertSchema = createInsertSchema(users);

export type UsersInsert = z.infer<typeof usersInsertSchema>;
