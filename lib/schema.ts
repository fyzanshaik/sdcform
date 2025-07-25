import {
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
} from 'drizzle-orm/pg-core';

export const applications = pgTable('applications', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	rollNumber: text('roll_number').notNull().unique(),
	branch: text('branch').notNull(),
	yearOfStudy: integer('year_of_study').notNull(),
	preferredPosition: text('preferred_position').notNull(),
	githubProfile: text('github_profile'),
	linkedinProfile: text('linkedin_profile'),
	notes: text('notes'),
	projects: text('projects'), // JSON stringified array of project links
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
