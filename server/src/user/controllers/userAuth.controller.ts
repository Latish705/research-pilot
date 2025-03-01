import { Request, Response } from "express";
import admin from "../../utils/firebase";
import UserModel from "../models/user.model";

export const handleIsFirstLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // @ts-ignore
    const user = req.user;
    // Check if the user exists in the database
    const dbUser = await UserModel.findOne({ uuid: user.uid });

    if (user) {
      res.status(200).json({ success: true, isFirstLogin: false });
      return;
    } else {
      res.status(200).json({ success: true, isFirstLogin: true });
      return;
    }
  } catch (error) {
    console.error("Error in isFirstLogin:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const user = req.user;
    const { profile_bio, contact, expertise, socialLinks } = req.body;

    const requiredFields = [
      "profile_bio",
      "contact",
      "expertise",
      "socialLinks",
    ];

    for (const field of requiredFields) {
      if (req.body[field] === undefined) {
        res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
        return;
      }
    }

    const email = user.email;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res
        .status(404)
        .json({ success: false, message: "User already exists try to login" });
      return;
    }

    // Update only provided fields
    const newUser = new UserModel({
      uuid: user.uid,
      email: user.email,
      profile_bio,
      contact,
      expertise,
      socialLinks,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in handleUpdateUser:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const user = req.user;
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({
      email,
    });

    if (!existingUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
    });
  } catch (error) {
    console.error("Error in handleUpdateUser:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
