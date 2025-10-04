import { Option } from "../models/option.model.js";
import { Result } from "../models/result.model.js"

 const submitResult = async (req, res) => {
  try {
    const { categoryId, levelId, answers } = req.body;

    if (!categoryId || !levelId || !answers || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Total questions = jitne questions quiz me the (frontend se aaye answers array ki full length)
    const total = answers.length;

    let score = 0;
    let wrong = 0;
    let skipped = 0;

    for (const ans of answers) {
      if (!ans.optionId) {
        // user ne skip kiya
        skipped++;
        // Agar skip ko galat bhi ginna hai:
        // wrong++;
        continue;
      }

      const option = await Option.findById(ans.optionId);
      if (option && option.isCorrect) {
        score++;
      } else {
        wrong++;
      }
    }

    const percentage = Math.round((score / total) * 100);

    const result = new Result({
      category: categoryId,
      level: levelId,
      score,
      total,
      wrong,
      skipped,
      percentage,
    });

    await result.save();

    return res.status(201).json({
      success: true,
      message: "Result saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error submitting result: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting result",
    });
  }
};

const getUserResults = async(req,res) => {
    try {
        const { userId } = req.user._id;

        const results = await Result.find({ user: userId })
        .populate("category", "name description")
        .populate("level", "name")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            results,
        });
    } catch (error) {
        console.error("Error while fetching results", error)
        return res.status(500).json({
            success: false,
            message: "Server error while fetching results",
        })
    }
}

export {getUserResults,submitResult} 