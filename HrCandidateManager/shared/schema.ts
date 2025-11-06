import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  address: text("address"),
  education: text("education"),
  experienceYears: integer("experience_years"),
  skills: text("skills"),
  resumeUrl: text("resume_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  fullName: z.string().min(1, "Full name is required").max(100, "Full name is too long"),
  email: z.string().email("Invalid email address").max(100, "Email is too long"),
  phoneNumber: z.string().min(1, "Phone number is required").max(20, "Phone number is too long"),
  address: z.string().optional(),
  education: z.string().optional(),
  experienceYears: z.coerce.number().int().min(0, "Experience must be 0 or greater").optional(),
  skills: z.string().optional(),
  resumeUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type InsertCandidate = z.infer<typeof insertCandidateSchema>;
export type Candidate = typeof candidates.$inferSelect;
