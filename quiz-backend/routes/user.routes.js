import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", verifyUser, logoutUser)

export default router;