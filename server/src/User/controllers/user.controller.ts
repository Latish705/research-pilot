import { Request, Response } from "express";
import admin from "../../utils/firebase";
import UserModel from "../models/user.model";

export const handleGetDetails = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return 
        }

        // Verify the Firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uuid = decodedToken.uid;

        // Check if the user exists in the database
        const user = await UserModel.findOne({ uuid });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return
        }

        // Send user details in response
        console.log("got user",user);
        res.status(200).json({ success: true, user });
        return;

    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return 
    }
};
