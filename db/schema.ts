import { pgTable, text, uuid, boolean, integer, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const links = pgTable('links', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  slug: text('slug').notNull().unique(),
  destination_url: text('destination_url').notNull(),
  title: text('title').notNull().default(''),
  user_id: text('user_id').notNull().default(''),
  clicks_count: integer('clicks_count').notNull().default(0),
  active: boolean('active').notNull().default(true),
  expires_at: timestamp('expires_at', { mode: 'string' }).notNull().default(sql`((now()) + interval '100 years')`),
  created_at: timestamp('created_at', { mode: 'string' }).notNull().default(sql`(now())`),
  updated_at: timestamp('updated_at', { mode: 'string' }).notNull().default(sql`(now())`),
});

export const link_clicks = pgTable('link_clicks', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  link_id: uuid('link_id').notNull().references(() => links.id),
  created_at: timestamp('created_at', { mode: 'string' }).notNull().default(sql`(now())`),
  ip: text('ip').notNull().default(''),
  user_agent: text('user_agent').notNull().default(''),
  referrer: text('referrer').notNull().default(''),
  country: text('country').notNull().default(''),
});
