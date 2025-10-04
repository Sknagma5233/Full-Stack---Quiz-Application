import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config()

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // avatar: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function(next){
  if( !this.isModified("password") ) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function(password){
 return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id : this._id,
      name : this.name,
      email : this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { 
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}


// export const User = mongoose.model("User", userSchema)

export const User =mongoose.models.User || mongoose.model("User", userSchema);
