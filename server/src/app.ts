import express, {Express} from "express";
import dotenv from "dotenv"
import indexRouter from "./routes/index.routes.js";
import { API_PREFIX } from "./constants/api.constants.js";
import cors from "cors";

dotenv.config()

const app:Express = express()
app.use(express.json())

app.use(cors())


app.use(API_PREFIX, indexRouter)

export default app;