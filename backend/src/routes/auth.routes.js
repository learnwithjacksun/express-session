import { Router } from "express";
import { getMe, login, logout, register } from "../controllers/auth.js";
import { authRequired } from "../middleware/authRequired.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authRequired, getMe);
authRouter.post("/logout", logout);

export default authRouter;
