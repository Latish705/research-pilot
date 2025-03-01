import mongoose, { Document } from "mongoose";

export interface IResearchPaper extends Document{
    title: string;
    author: string;
    category: string;
    year: number;
    description: string;
    tags: string[];
    profile_pic: string;
    collaborators: string[];
}


export interface IResearchPaperModel extends mongoose.Model<IResearchPaper> {
}