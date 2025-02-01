import express from "express";
import dotenv from "dotenv";
import Pool from "./server/config/database.js";
import cookieParser from "cookie-parser";

import adminRoutes from "./server/routes/adminroutes.js"
//import tweetRoute from "./server/routes/tweetRoute.js"
import cors from "cors";
//connection.connect();
dotenv.config({
    path:".env"
})


const app = express();

//middlewares
app.use(express.urlencoded({
    extended:true,
}));
app.use(express.json());
app.use(cookieParser());


const corsOptions={
    origin:"http://localhost:3000",
    credentials:true
}
app.use(cors({
    origin: 'https://shrinik-project.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
//app.use(cors(corsOptions));
//api
/*app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
  });*/
app.use("/api",adminRoutes);
//app.use("/api/v1/tweet",tweetRoute);
app.get("/home",(req,res)=>{
    res.status(200).json({
        message:"coming from server",
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`server listen at port${process.env.PORT}`)
})
