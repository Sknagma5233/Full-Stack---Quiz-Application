import { Category } from "../models/category.model.js";
import { Level } from "../models/level.model.js";
import { Question } from "../models/question.model.js";  

const createLevel = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    if (!categoryId || !name) {
      return res.status(400).json({
        message: "Category ID and and Level name are required",
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const existedLevel = await Level.findOne({ category: categoryId, name });

    if (existedLevel) {
      return res
        .status(409)
        .json({ message: "Level already exist in this category" });
    }

    const level = await Level.create({ category: categoryId, name });

    return res.status(201).json({
      success: true,
      level,
      message: "Level created successfully",
    });
  } catch (error) {}
};


const getLevelsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;


    const levels = await Level.find({ category: categoryId });

    if (!levels || levels.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No levels found" });
    }

    const levelsWithCount = await Promise.all(
      levels.map(async (level) => {
        const questionCount = await Question.countDocuments({ level: level._id });
        // .toObject() se Mongoose doc ko plain JS object banata haiii
        return { ...level.toObject(), totalQuestions: questionCount };
      })
    );

    return res.status(200).json({
      success: true,
      levels: levelsWithCount,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching levels",
      error: error.message,
    });
  }
};


export { createLevel, getLevelsByCategory };
