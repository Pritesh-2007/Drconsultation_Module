const express=require("express");
const router=express.Router();
const { signup, Login, Logout, getuser } = require("../Controller/Users");
router.get("/user/:id",getuser)
router.post("/signup",signup);
router.post("/login",Login);
router.post("/logout",Logout)
module.exports=router;
