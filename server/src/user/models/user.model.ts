import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "dotenv";
import { IUser, IUserModel } from "../types/user.type";

env.config();

const UserSchema = new mongoose.Schema<IUser>(
    {
        uuid: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, minlength: [6, "Password should have MinLength of 6"], select: false },
        profile_bio: { type: String, required: false, default: "" },
        contact: { type: Number, required: false, trim: true },
        researchers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        contributions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contribution" }],
        profilePic: { type: String, required: false, default: "" },
        expertise: [{ type: String, required: false }],
        socialLinks: {
            linkedIn: { type: String, required: false },
            twitter: { type: String, required: false },
            github: { type: String, required: false },
            website: { type: String, required: false },
        },
        activeYN: { type: Boolean, required: false, default: true },
    },
    { timestamps: true }
);


const UserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default UserModel;