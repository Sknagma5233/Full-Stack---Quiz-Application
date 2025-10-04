import express from "express";
import { createLevel } from "../controllers/level.controller.js"

const router = express.Router();

router.post("/" , createLevel);
// router.get("/categories/:categoryId", getLevelsByCategory);

export default router;