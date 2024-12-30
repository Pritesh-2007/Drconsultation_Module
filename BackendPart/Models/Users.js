const Module = require("module");
const mongoose=require("mongoose");
const UserShema=new mongoose.Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String,
    },
    Password:{
        type:String,
    },
    role:{
        type:String,
        default:"patient"
    }
});
const Users=mongoose.model('Users',UserShema);
module.exports=Users;