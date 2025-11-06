import { candidates, type Candidate, type InsertCandidate } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, sql } from "drizzle-orm";

export interface IStorage {
  createCandidate(candidate: InsertCandidate): Promise<Candidate>;
  getAllCandidates(): Promise<Candidate[]>;
  getCandidateById(id: number): Promise<Candidate | undefined>;
  updateCandidate(id: number, candidate: InsertCandidate): Promise<Candidate | undefined>;
  deleteCandidate(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async createCandidate(insertCandidate: InsertCandidate): Promise<Candidate> {
    const [candidate] = await db
      .insert(candidates)
      .values(insertCandidate)
      .returning();
    return candidate;
  }

  async getAllCandidates(): Promise<Candidate[]> {
    return await db.select().from(candidates).orderBy(sql`${candidates.createdAt} DESC`);
  }

  async getCandidateById(id: number): Promise<Candidate | undefined> {
    const [candidate] = await db.select().from(candidates).where(eq(candidates.id, id));
    return candidate || undefined;
  }

  async updateCandidate(id: number, data: InsertCandidate): Promise<Candidate | undefined> {
    const [candidate] = await db
      .update(candidates)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(candidates.id, id))
      .returning();
    return candidate || undefined;
  }

  async deleteCandidate(id: number): Promise<boolean> {
    const result = await db
      .delete(candidates)
      .where(eq(candidates.id, id))
      .returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
