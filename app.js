import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import fileUpload from "express-fileupload"
import userRouter from './routes/userRouter.js'
import applicationRouter from './routes/applicationRouter.js'
import jobRouter from './routes/jobRouter.js'
import {dbConnection} from './database/dbConnection.js'
import {errorMiddleware} from "./middlewares/error.js"

const app=express();

dotenv.config({path:"./config/config.env"});

console.log(process.env.FRONTEND_URL);

const corsOptions = {
    origin:  process.env.FRONTEND_URL || 'http://localhost:5173', // Specify the origin you want to allow
    methods:['GET','POST','DELETE','PUT'],
    credentials: true, // Enable the Access-Control-Allow-Credentials CORS header
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
  };
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight across-the-board 


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));



  
app.use('/api/v1/user',userRouter)
app.use('/api/v1/application',applicationRouter)
app.use('/api/v1/job',jobRouter)

dbConnection();

app.use(errorMiddleware)

export default app;