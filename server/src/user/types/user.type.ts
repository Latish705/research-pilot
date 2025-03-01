import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    uuid: string;
    email: string;
    password: string;
    profile_bio?: string;
    contact?: string;
    researchers?: mongoose.Types.ObjectId[];
    contributions?: mongoose.Types.ObjectId[];
    profilePic?: string;
    expertise?: string[];
    socialLinks?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        website?: string;
    };
    activeYN?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserModel extends mongoose.Model<IUser> {
}
