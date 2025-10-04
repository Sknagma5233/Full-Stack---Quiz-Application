import { Question } from "../models/question.model.js";
import { Option } from "../models/option.model.js";

const createQuestions = async (req, res) => {
  try {
    const { text, categoryId, levelId, options } = req.body;

    if (!text || !categoryId || !levelId || !options || options.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Question text, categoryId, levelId and at least 2 options are required",
      });
    }

    const question = new Question({
      text,
      category: categoryId,
      level: levelId,
    });
    await question.save();

    const createdOptions = await Promise.all(
      options.map(async (opt) => {
        const newOption = new Option({
          text: opt.text,
          isCorrect: opt.isCorrect || false,
          question: question._id,
        });
        return await newOption.save();
      })
    );

    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: {
        ...question.toObject(),
        options: createdOptions,
      },
    });
  } catch (error) {
    console.error("Error creating question:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating question",
    });
  }
};

const getQuestions = async (req, res) => {
  try {
    const { levelId } = req.params;

    if (!levelId) {
      return res.status(400).json({
        success: false,
        message: "Level Id is required",
      });
    }
    // Saare questions fetch karo
    const questions = await Question.find({ level: levelId }).lean();

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for this level",
      });
    }

    // Har question ke options nikaalna
    const questionsWithOptions = await Promise.all(
      questions.map(async (question) => {
        const options = await Option.find({ question: question._id }).lean();
        return { ...question, options };
      })
    );

    return res.status(200).json({
      success: true,
      data: questionsWithOptions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching questions",
    });
  }
};

export { getQuestions, createQuestions };
