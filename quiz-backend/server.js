import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
))

console.log(process.env.CORS_ORIGIN)
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed" , error)
})

app.use(express.json())
app.use(cookieParser())

//routing 
import userRouter from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import levelRoutes from "./routes/level.routes.js";
import questionRoutes from "./routes/question.routes.js";
import resultRoutes from "./routes/result.routes.js";

app.use("/api/users", userRouter)
app.use("/api/categories", categoryRoutes)
app.use("/api/levels", levelRoutes);
app.use("/api/questions", questionRoutes)
app.use("/api/results", resultRoutes)


export { app }

