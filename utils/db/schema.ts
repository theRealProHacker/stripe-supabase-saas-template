import { integer, pgTable, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    plan: text('plan').notNull(),
    stripe_id: text('stripe_id').notNull(),
    target_language: text('target_language'),
    native_language: text('native_language').default('en'),
    memory: jsonb('memory'),
    voice_settings: jsonb('voice_settings'),
    theme_settings: jsonb('theme_settings'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

export const sessionsTable = pgTable('sessions_table', {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => usersTable.id),
    start_time: timestamp('start_time').notNull(),
    end_time: timestamp('end_time'),
    duration_minutes: integer('duration_minutes'),
    language: text('language').notNull(),
    session_type: text('session_type').notNull(), // 'practice' | 'conversation' | 'lesson'
    summary: text('summary'),
    vocabulary_learned: jsonb('vocabulary_learned'),
    grammar_practiced: jsonb('grammar_practiced'),
    ai_feedback: jsonb('ai_feedback'),
    created_at: timestamp('created_at').defaultNow(),
});

export const usageTrackingTable = pgTable('usage_tracking_table', {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => usersTable.id),
    date: text('date').notNull(), // YYYY-MM-DD format
    minutes_used: integer('minutes_used').default(0),
    sessions_count: integer('sessions_count').default(0),
    plan_limit: integer('plan_limit').notNull(),
    created_at: timestamp('created_at').defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertSession = typeof sessionsTable.$inferInsert;
export type SelectSession = typeof sessionsTable.$inferSelect;
export type InsertUsageTracking = typeof usageTrackingTable.$inferInsert;
export type SelectUsageTracking = typeof usageTrackingTable.$inferSelect;