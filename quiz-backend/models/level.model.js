import mongoose, { Schema } from "mongoose";

const levelSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim : true
    },
    totalQuestions: {
        type: Number,
        default: 0
    },
    category:{
            type:Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
},{
    timestamps:true
})

export const Level = mongoose.model("Level", levelSchema)