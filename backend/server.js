import express from "express";
import dotenv from 'dotenv';
import userRouter from "./routes/userRoutes.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path'

dotenv.config();
connectDb()
const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/users',userRouter);
/* if(process.env.SERVER == 'production'){     production code
    const __dirname = path.resolve()
   app.use(express.static(path.join(__dirname,'/usercreation/build')))
   app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'usercreation','build','index.html'))
   })
} */
const port = process.env.PORT || 5000

app.use(notFound);
app.use(errorHandler);

app.listen(port,() => {console.log(`listening on port number${port} `)} );
