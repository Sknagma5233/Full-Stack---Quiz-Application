import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    description:{
        type:String,
        required:true
    },
    totalQuestions: {
        type: Number,
        default: 0
    },
    topicsCovered: {
        type: [String],
        default:[]
    }
},{
    timestamps:true
})

export const Category = mongoose.model("Category", categorySchema)