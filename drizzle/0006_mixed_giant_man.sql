ALTER TABLE "comments" RENAME COLUMN "author_id" TO "author";--> statement-breakpoint
ALTER TABLE "comments" RENAME COLUMN "post_id" TO "post";--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_author_id_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_users_uuid_fk" FOREIGN KEY ("author") REFERENCES "public"."users"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_posts_id_fk" FOREIGN KEY ("post") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;