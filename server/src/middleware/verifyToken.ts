import { Request, Response, NextFunction } from "express";
import admin from "../utils/firebase";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.body.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = await admin.auth().verifyIdToken(token);

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized user" });
      return;
    }

    //@ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
