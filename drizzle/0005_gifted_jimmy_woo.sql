DROP INDEX "title_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "title_idx" ON "posts" USING btree ("title","author");