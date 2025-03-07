import axios from "axios";
import { Request, Response } from "express";
import UserModel from "../models/user.model";

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

    const experts = await UserModel.find({});

    res.status(200).json({ success: true, response: axiosResponse.data });
    return;
  } catch (error: any) {
    console.error("Error in chatWithBot:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const getRecommendedTopics = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    console.log("user:", user);

    const userData = await UserModel.findOne({ uuid: user.user_id });
    console.log("userData:", userData);
    if (!userData) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const axiosResponse = await axios.post(`${ml_server_url}/chat`, {
      text: JSON.stringify(userData),
    });
    console.log("axiosResponse:", axiosResponse.data.response);

    const axiosResponse2 = await axios.post(
      `${ml_server_url}/research_papers`,
      {
        text: axiosResponse.data.response,
      }
    );
    console.log("axiosResponse2:", axiosResponse2.data);

    res.status(200).json({ success: true, response: axiosResponse2.data });
    return;
  } catch (error: any) {
    console.error("Error in getRecommendedTopics:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const getRecommendedDatasets = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    console.log("user:", user);

    const userData = await UserModel.findOne({ uuid: user.user_id });
    console.log("userData:", userData);
    if (!userData) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const axiosResponse = await axios.post(`${ml_server_url}/chat`, {
      text: JSON.stringify(userData),
    });
    console.log("axiosResponse:", axiosResponse.data.response);

    const axiosResponse2 = await axios.post(
      `${ml_server_url}/kaggle_datasets`,
      {
        text: axiosResponse.data.response,
      }
    );
    console.log("axiosResponse2:", axiosResponse2.data);

    res.status(200).json({ success: true, response: axiosResponse2.data });
    return;
  } catch (error: any) {
    console.error("Error in getRecommendedDatasets:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const getPaperOnTopic = async (req: Request, res: Response) => {
  try {
    const { topic } = req.params;

    if (!topic) {
      res.status(400).json({
        success: false,
        message: "topic is required",
      });
      return;
    }

    const axiosResponse = await axios.post(`${ml_server_url}/research_papers`, {
      text: topic,
    });

    console.log("axiosResponse:", axiosResponse.data);

    res.status(200).json({ success: true, response: axiosResponse.data });
    return;
  } catch (error: any) {
    console.error("Error in getPaperOnTopic:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};
