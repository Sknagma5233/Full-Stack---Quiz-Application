import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
    text:{
        type: String,
        required:true, 
    },
    category:{
            type: Schema.Types.ObjectId,
            ref: "Category"
        },
    level:{
            type: Schema.Types.ObjectId,
            ref: "Level"
        },
    options:[
        {
            type: Schema.Types.ObjectId,
            ref: "Option"
        }
    ]
},{
    timestamps:true
})

export const Question = mongoose.model("Question", questionSchema)