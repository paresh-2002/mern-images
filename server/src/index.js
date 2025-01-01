import express  from "express";
import dotenv from  "dotenv";
import cookieParser from  "cookie-parser";
import cors from  "cors";

dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors()
);

// connect to mongoDB

connectDB()

// set up routes
import userRouter from './routes/user.routes.js'
import customerRouter from './routes/customer.routes.js'
import connectDB from "./db/index.js";
import imageRouter from './routes/image.routes.js';

app.use("/images", imageRouter)

app.use("/auth",userRouter);
app.use("/customer",customerRouter);
