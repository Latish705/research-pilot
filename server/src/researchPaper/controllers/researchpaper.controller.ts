import { Request, Response } from "express";
import ResearchPaper from "../models/researchpaper.model";
import UserModel from "../../user/models/user.model";
import PaperUser from "../models/paperUserModel";
import admin from "../../utils/firebase";

export const handleSaveResearchPaper = async (
  req: Request,
  res: Response
): Promise<void> => {
  //@ts-ignore
  const user = req.user;

  console.log(user);

  const { title, content } = req.body;
  console.log(title, content);

  const dbUser = (await UserModel.findOne({ uuid: user.uid })) as {
    _id: string;
  };
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
    // @ts-ignore
    const user = req.user;

    const paper = await ResearchPaper.findOne({ _id: req.params.paperId });

    if (!paper) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    const dbUser = (await UserModel.findOne({ uuid: user.uid })) as {
      _id: string;
    };

    if (!dbUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    //@ts-ignore
    if (paper.author.toString() === dbUser._id.toString()) {
      res.status(200).json({
        ...paper.toObject(),
        role: "owner",
      });
      return;
    }

    const findPaperUser = await PaperUser.findOne({
      paperId: paper._id,
      collaboratorId: dbUser._id,
    });

    if (!findPaperUser) {
      res
        .status(401)
        .json({ error: "You are not authorized to view this document" });
      return;
    }

    res.status(200).json({
      ...paper.toObject(),
      role: findPaperUser.role,
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

export const getSharedPapers = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;

    const dbUser = await UserModel.findOne({ uuid: user.uid });
    if (!dbUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const papers = await PaperUser.find({ collaboratorId: dbUser._id });

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

export const addCollaborator = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // @ts-ignore
    const user = req.user;

    const { paperId, collaboratorEmail, role } = req.body;

    if (!paperId || !collaboratorEmail) {
      res
        .status(400)
        .json({ error: "Paper ID and collaborator email are required" });
      return;
    }

    const paper = await ResearchPaper.findOne({ _id: paperId });
    const dbUser = await UserModel.findOne({ uuid: user.uid });
    if (!dbUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (
      paper?.author &&
      typeof paper.author === "string" &&
      paper.author.toString() !== (dbUser._id as string).toString()
    ) {
      res.status(401).json({
        error: "You are not authorized to add collaborator to this paper",
      });
      return;
    }
    if (!paper) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    const collaborator = await admin.auth().getUserByEmail(collaboratorEmail);
    console.log(collaborator);
    console.log(collaborator.uid);

    if (!collaborator) {
      res.status(404).json({ error: "Collaborator not found" });
      return;
    }

    const collaboratorDbUser = await UserModel.findOne({
      uuid: collaborator.uid,
    });
    console.log(collaboratorDbUser);

    const newPairPaperCollaborator = new PaperUser({
      paperId: paper._id,
      collaboratorId: collaboratorDbUser?._id,
      role: role,
    });

    await newPairPaperCollaborator.save();

    res.status(200).json({
      message: "Collaborator added successfully",
    });
  } catch (error: any) {
    // log error in detail
    console.error("Error in addCollaborator:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};
