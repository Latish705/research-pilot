import { Request, Response, NextFunction } from "express";
import admin from "../utils/firebase";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.body.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = await admin.auth().verifyIdToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    //@ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
