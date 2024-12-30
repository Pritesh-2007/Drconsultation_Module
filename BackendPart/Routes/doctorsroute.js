const express=require("express");
const router=express.Router();
const { PostDoctors, fetchdoctors, doctorInfo } = require("../Controller/Doctors");
router.post("/adddoctor",PostDoctors);
router.get("/getdoctorlist",fetchdoctors);
router.get("/getdoctorinfo/:Did",doctorInfo);

module.exports=router;
