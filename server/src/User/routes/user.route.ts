import { Router } from "express";
import { handleIsFirstLogin, handleUpdateUser} from "../controllers/userAuth.controller";
import { handleGetDetails } from "../controllers/user.controller";
import verifyToken from "../../middleware/verifyToken";


const userRouter = Router();

userRouter.get("/first_login", verifyToken, handleIsFirstLogin);
userRouter.post("/signup", handleUpdateUser);
userRouter.get("/getDetails", verifyToken, handleGetDetails);




export default userRouter;
