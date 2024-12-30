const Module = require("module");
const mongoose=require("mongoose");
const DoctorShema=new mongoose.Schema({
    Name:{
        type:String,
    },
    Education:{
        type:String,
    },
    Experience:{
        type:Number,
    }
    ,Speciality:{
        type:String
    }
    ,consult_fee:{
        type:Number
    }
    ,userId:{
        type:String
    }
});
const Doctors=mongoose.model('Doctors',DoctorShema);
module.exports=Doctors;