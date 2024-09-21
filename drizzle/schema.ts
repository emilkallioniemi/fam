import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const MessageTable = pgTable("message", {
  id: serial("id").primaryKey().notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
