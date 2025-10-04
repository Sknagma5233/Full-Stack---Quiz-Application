import express from "express";
import { createCategory, getAllCategories, updateCategory } from "../controllers/category.controller.js";
import { getLevelsByCategory } from "../controllers/level.controller.js";

const router = express.Router();

router.post("/", createCategory)
router.get("/", getAllCategories);
router.put("/:categoryId", updateCategory)

router.get("/:categoryId/levels", getLevelsByCategory);

export default router;