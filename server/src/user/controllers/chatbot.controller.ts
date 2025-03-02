import axios from "axios";
import { Request, Response } from "express";

const ml_server_url = process.env.ML_SERVER_URL;

export const chatWithBot = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;

    const { query } = req.body;

    const requiredFields = ["query"];

    if (!query) {
      res.status(400).json({
        success: false,
        message: "query is required",
      });
      return;
    }

    const axiosResponse = await axios.post(`${ml_server_url}/research_chat`, {
      text: query,
    });
    console.log("axiosResponse:", axiosResponse.data);

    res.status(200).json({ success: true, response: axiosResponse.data });
    return;
  } catch (error: any) {
    console.error("Error in chatWithBot:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};
