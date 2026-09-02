import { Router } from "express";
import { login, RefreshTokenController, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", RefreshTokenController)


export default router;