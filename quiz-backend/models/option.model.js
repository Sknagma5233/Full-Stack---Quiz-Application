import mongoose, { Schema } from "mongoose";

const optionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required:true
    },
  },
  { timestamps: true }
);

export const Option = mongoose.model("Option", optionSchema);
