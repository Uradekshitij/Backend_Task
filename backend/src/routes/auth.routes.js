import express from "express";
import authController from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/check-auth", authController.checkAuth);
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.login);
router.get("/user/logout", authController.logout);






export default router;
