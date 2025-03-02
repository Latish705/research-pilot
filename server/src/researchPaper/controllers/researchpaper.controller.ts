import { Request, Response } from "express";
import ResearchPaper from "../models/researchpaper.model";

export const handleSaveResearchPaper = async (req: Request, res: Response): Promise<void> => {
  const { paperId, title, content } = req.body;

  try {
    const existingPaper = await ResearchPaper.findOne({ _id:paperId });

    if (existingPaper) {
      existingPaper.content = content;
      existingPaper.set("updatedAt", new Date()); // Proper way to update timestamp
      await existingPaper.save();
      res.status(200).json({ message: "Document updated successfully!" });
      return;
    } else {
      const newPaper = new ResearchPaper({ paperId, title, content });
      await newPaper.save();
      res.status(200).json({ message: "Document saved successfully!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export const handleGetResearchPaper = async (req: Request, res: Response): Promise<void>  => {
  try {
    const paper = await ResearchPaper.findOne({ _id: req.params.paperId });

    if (!paper) {
    res.status(404).json({ error: "Document not found" });
      return; 
    }

    res.status(200).json({
      ...paper.toObject(),
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};
