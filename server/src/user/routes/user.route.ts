import { Router } from "express";
import { handleIsFirstLogin, signup } from "../controllers/userAuth.controller";
import { handleGetDetails } from "../controllers/user.controller";
import verifyToken from "../../middleware/verifyToken";
import { chatWithBot } from "../controllers/chatbot.controller";

const userRouter = Router();

userRouter.get("/first_login", verifyToken, handleIsFirstLogin);
userRouter.post("/signup", verifyToken, signup);
userRouter.get("/getDetails", verifyToken, handleGetDetails);

userRouter.post("/chatbot", verifyToken, chatWithBot);

export default userRouter;
