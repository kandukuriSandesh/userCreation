import express from "express";
import dotenv from 'dotenv';
import userRouter from "./routes/userRoutes.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();
connectDb()
const app = express()

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/users',userRouter);
const port = process.env.PORT || 5000

app.use(notFound);
app.use(errorHandler);

app.listen(port,() => {console.log(`listening on port number${port} `)} );
