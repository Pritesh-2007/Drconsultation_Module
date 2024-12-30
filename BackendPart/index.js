const express = require('express');
require('dotenv').config();
const DBConnect = require("./Config/DBcon");
const router=require("./Routes/users")
const cors = require("cors");
const cookieParser=require("cookie-parser");
const port=process.env.PORT;
const app=express();
DBConnect();

app.listen(port,()=>{console.log("Server Started at:",port)});
app.get("/home",(req,res)=>{
    res.send("Hello users!")
});
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
const userroute=require('./Routes/users')
const transactionroute=require('./Routes/transactionroute')
const walletroute=require('./Routes/walletroute')
const doctorroute=require('./Routes/doctorsroute')

app.use('/users/api',userroute);
app.use('/users/api',transactionroute);
app.use('/users/api',walletroute);
app.use('/users/api',doctorroute);

