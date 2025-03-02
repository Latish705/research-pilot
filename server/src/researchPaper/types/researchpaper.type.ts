import mongoose, { Document } from "mongoose";

export interface IResearchPaper extends Document{
    title: string;
    author: string;
    content: string;
    collaborators: string[];
}


export interface IResearchPaperModel extends mongoose.Model<IResearchPaper> {
}