import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCandidateSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/candidates", async (req, res) => {
    try {
      const candidates = await storage.getAllCandidates();
      res.json(candidates);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch candidates" });
    }
  });

  app.get("/api/candidates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid candidate ID" });
      }
      
      const candidate = await storage.getCandidateById(id);
      if (!candidate) {
        return res.status(404).json({ error: "Candidate not found" });
      }
      
      res.json(candidate);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch candidate" });
    }
  });

  app.post("/api/candidates", async (req, res) => {
    try {
      const validatedData = insertCandidateSchema.parse(req.body);
      const candidate = await storage.createCandidate(validatedData);
      res.status(201).json(candidate);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      if (error.message?.includes('unique') || error.message?.includes('duplicate')) {
        return res.status(409).json({ error: "A candidate with this email already exists" });
      }
      res.status(500).json({ error: error.message || "Failed to create candidate" });
    }
  });

  app.put("/api/candidates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid candidate ID" });
      }

      const validatedData = insertCandidateSchema.parse(req.body);
      const candidate = await storage.updateCandidate(id, validatedData);
      
      if (!candidate) {
        return res.status(404).json({ error: "Candidate not found" });
      }
      
      res.json(candidate);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      if (error.message?.includes('unique') || error.message?.includes('duplicate')) {
        return res.status(409).json({ error: "A candidate with this email already exists" });
      }
      res.status(500).json({ error: error.message || "Failed to update candidate" });
    }
  });

  app.delete("/api/candidates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid candidate ID" });
      }

      const deleted = await storage.deleteCandidate(id);
      if (!deleted) {
        return res.status(404).json({ error: "Candidate not found" });
      }
      
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to delete candidate" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
