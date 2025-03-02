import { Request, Response } from "express";
import ResearchPaper from "../models/researchpaper.model";
import UserModel from "../../user/models/user.model";

export const handleSaveResearchPaper = async (
  req: Request,
  res: Response
): Promise<void> => {
  //@ts-ignore
  const user = req.user;

  console.log(user);

  const { title, content } = req.body;
  console.log(title, content);

  const dbUser = await UserModel.findOne({ uuid: user.uid });
  console.log(dbUser);

  try {
    const newPaper = new ResearchPaper({ author: dbUser?._id, title, content });
    await newPaper.save();
    res.status(200).json({ message: "Document saved successfully!" });
    return;
  } catch (error: any) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
    return;
  }
};

export const handleUpdateResearchPaper = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { paperId } = req.params;

    const paper = await ResearchPaper.findOne({ _id: paperId });

    if (!paper) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    const { title, content } = req.body;

    paper.title = title;
    paper.content = content;

    await paper.save();

    res.status(200).json({
      message: "Document updated successfully",
    });

    return;
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const handleGetResearchPaper = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const handleGetAllPaper = async (
  req: Request,
  res: Response
): Promise<void> => {
  //@ts-ignore
  const user = req.user;
  console.log(user);

  try {
    console.log(user);

    const dbUser = await UserModel.findOne({ uuid: user.uid });
    console.log(dbUser);

    const papers = await ResearchPaper.find({ author: dbUser?._id });
    if (!papers || papers.length === 0) {
      res.status(404).json({ error: "No papers found for this user" });
      return;
    }
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
