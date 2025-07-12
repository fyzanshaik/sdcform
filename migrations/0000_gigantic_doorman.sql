CREATE TABLE "applications" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"roll_number" text NOT NULL,
	"branch" text NOT NULL,
	"year_of_study" integer NOT NULL,
	"preferred_position" text NOT NULL,
	"github_profile" text,
	"linkedin_profile" text,
	"notes" text,
	"projects" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "applications_roll_number_unique" UNIQUE("roll_number")
);
