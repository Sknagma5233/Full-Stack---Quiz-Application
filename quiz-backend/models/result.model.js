import mongoose, { Schema } from "mongoose";

const resultSchema = new Schema(
  {
    score: {
      type: Number,
    },
    total: {
      type: Number,
    },
    percentage: {
      type: Number,
    },
    wrong: {
      type: Number,
      default: 0,
    },
    skipped: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: "Level",
    },
  },
  {
    timestamps: true,
  }
);

export const Result = mongoose.model("Result", resultSchema);
