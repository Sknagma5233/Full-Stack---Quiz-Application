import express from "express";
import { submitResult, getUserResults } from "../controllers/result.controller.js"
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/", verifyUser, submitResult);
router.get("/levels/:levelId", verifyUser, getUserResults);

export default router;