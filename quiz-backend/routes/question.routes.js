import express from "express";
import { createQuestions, getQuestions } from "../controllers/question.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/levels/:levelId",verifyUser, getQuestions);

router.post("/", createQuestions)

export default router;