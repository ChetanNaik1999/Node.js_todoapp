const express=require('express');
const app=express();
const User=require("./routes/User.js");
const Task=require("./routes/Task.js");
const dotenv=require("dotenv");
const cookieParser = require('cookie-parser');
const cors=require("cors");

dotenv.config({
    path:'./backend/config/config.env'
});
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );


app.use('/api/v1',User);
app.use('/api/v2',Task);


module.exports=app;