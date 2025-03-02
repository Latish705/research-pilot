import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "dotenv";

export interface IUser extends Document {
  uuid: string;
  fullname: string;
  mobileNo: string;
  researchDomain: string;
  currentPos: string;
  organization: string;
  yearsOfResearchExp: string;
  pastResearchWork: string;
  researchInterests: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    uuid: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    mobileNo: { type: String },
    researchDomain: { type: String, required: true },
    currentPos: { type: String, required: true },
    organization: { type: String, required: true },
    yearsOfResearchExp: { type: String, required: true },
    pastResearchWork: { type: String },
    researchInterests: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
