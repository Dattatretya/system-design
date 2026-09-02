import express, {Express} from "express";
import dotenv from "dotenv"
import indexRouter from "./routes/index.routes.js";
import { API_PREFIX } from "./constants/api.constants.js";
import uploadRouter from "./routes/upload.routes.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"


dotenv.config()

const app:Express = express()
app.use(express.json())

app.use(cors());
app.use(cookieParser());


app.use(API_PREFIX, indexRouter)
app.use("/api/v1/uploads", uploadRouter)
app.use("/auth", authRoutes);

export default app;