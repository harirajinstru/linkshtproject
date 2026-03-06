CREATE TABLE "link_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT (now()) NOT NULL,
	"ip" text DEFAULT '' NOT NULL,
	"user_agent" text DEFAULT '' NOT NULL,
	"referrer" text DEFAULT '' NOT NULL,
	"country" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"destination_url" text NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"user_id" text DEFAULT '' NOT NULL,
	"clicks_count" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp DEFAULT ((now()) + interval '100 years') NOT NULL,
	"created_at" timestamp DEFAULT (now()) NOT NULL,
	"updated_at" timestamp DEFAULT (now()) NOT NULL,
	CONSTRAINT "links_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "link_clicks" ADD CONSTRAINT "link_clicks_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE no action ON UPDATE no action;