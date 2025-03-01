import { Request, Response } from "express";
import admin from "../../utils/firebase";
import UserModel from "../models/user.model";


export const handleIsFirstLogin = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      // Verify the Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);
      const googleId = decodedToken.uid;
  
      // Check if the user exists in the database
      const user = await UserModel.findOne({ googleId });
  
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

export const handleUpdateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded Token:", decodedToken);

        const { profile_bio, contact, expertise, socialLinks } = req.body;
        if (!contact || !expertise) {
            res.status(400).json({ success: false, message: "Missing required fields" });
            return;
        }

        const email = decodedToken.email;
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        // Update only provided fields
        if (profile_bio !== undefined) existingUser.profile_bio = profile_bio;
        if (contact !== undefined) existingUser.contact = contact;
        if (expertise !== undefined) existingUser.expertise = expertise;
        if (socialLinks !== undefined) existingUser.socialLinks = socialLinks;

        await existingUser.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                email: existingUser.email,
                profile_bio: existingUser.profile_bio,
                contact: existingUser.contact,
                expertise: existingUser.expertise,
                socialLinks: existingUser.socialLinks,
            },
        });
    } catch (error) {
        console.error("Error in handleUpdateUser:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};