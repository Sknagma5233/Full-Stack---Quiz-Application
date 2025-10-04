import { User } from "../models/user.model.js"
// import { uploadOnCloudinary } from "../utils/cloudinary.js"

const generateAccessAndRefreshTokens = async(userId) => {
  try{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()

    return { accessToken }

  }
  catch(error){
   throw new Error("Error generating access token");

}
}

const registerUser = async(req,res) => {
    try {
       const { name, email, password, confirmPassword } = req.body

       if(!email || !name || !password || !confirmPassword){
        return res.status(400).json({message:"All feilds are required"})
       }

if(password !== confirmPassword){
  return res.status(400).json({message:"Password and confirm password does not match"})
}

       const existedUser = await User.findOne({
        $or: [{ name }, { email }]
       })

       if(existedUser) {
        return res.status(409).json({message: "User with name or email already exists"})
       }

//        if (!req.file) {
//   return res.status(400).json({ message: "Avatar file is required" });
// }

// const avatarLocalPath = req.file.path;

        

//        if(!avatarLocalPath){
//         return res.status(400).json({message: "Avatar file is required"})
//        }

//        const avatar = await uploadOnCloudinary(avatarLocalPath)

//        if(!avatar){
//         return res.status(400).json({ message: "Avatar file is required"})
//        }


       const user = await User.create({
        name,
        // avatar:avatar.url,
        email,
        password,
       })

       const createdUser = await User.findById(user._id).select("-password")

       if(!createdUser) {
        return res.status(201).json({ message: "Something went wrong while regstering the user"})
       }

       return res.status(201).json({
        success:true, createdUser,
        message: "User registered succcessfully"})

    } catch (err) {
        res.status(402).json({
            success:false,
            message: "Error while registering the user",
            error:err.message
        })
    }
}

const loginUser = async(req,res) => {
    try {
        const { email, password } = req.body
        
        if (!email){
           return res.status(400).json({
                message: "Email is required"
            })
        }

        const user = await User.findOne({email})

        if(!user){
          return  res.status(404).json({
                message: "User already exists"
            })
        }

       const isPasswordValid = await user.isPasswordCorrect(password)

       if(!isPasswordValid){
        return res.status(404)
        .json({
            message: "Password incorrect"
        })
       }

       const { accessToken } = await generateAccessAndRefreshTokens(user._id)

       const loggedInUser = await User.findById(user._id).select("-password")

       const options = {
        httpOnly: true,
        secure: true
       }

       return res.status(200)
       .cookie("accessToken", accessToken, options)
        .json({
            success:true,
            user:loggedInUser, accessToken,
            message: "User logged in successfully"
        })
    } catch (error) {
          res.status(402).json({
            success:false,
            message: "Error while login",
            error:error.message
    })  
    }
}

const logoutUser = async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            new: true
        }
    )

  const options = {
    httpOnly: true,
    secure: true
  }

    return res
  .status(200)
  .clearCookie("accessToken", options)
  .json({
    success: true,
    message: "User logged out "
  })
}

export { registerUser, loginUser , logoutUser}