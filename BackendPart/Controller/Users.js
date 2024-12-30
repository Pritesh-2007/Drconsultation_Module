const User=require('../Models/Users');
const jwt= require("jsonwebtoken");
const bcrypt=require("bcrypt")
require("dotenv").config();
exports.signup=async(req,res)=>{
    try
    {
     const{Name,Email,Password,role} =req.body;
    let Ispresent=await User.findOne({Email});
     if(Ispresent)
     {
      return res.status(400).json({
        success:false,
        msg:"User already exist"
       }); 
     }
     try {
        
        let hp;
        try {
            hp=await  bcrypt.hash(Password,10);

        } catch (error) {
            return  res.status(500).json({
                success:false,
                msg:"Problem in Hashing!"
            })
        }
            const user=new User({Name,Password:hp,Email,role})
            await user.save();
           return res.status(201).json({success:true,data:user,msg:"user created!"});
     } 
        catch (error) 
        {
        console.log(error)    
        }
    } 
    catch (error) {
       console.log(error); 
    }
}
exports.Login=async (req,res) => {
    try {
        const{Email,Password}=req.body;
            let user=await User.findOne({Email})
            if(!user)
            {
                return res.status(404).json({
                    success:false,
                    msg:"Incorrect UserName or Password"
                }) 
            }
           
            
            if(await bcrypt.compare(Password,user.Password))
            {
                    const token=jwt.sign({userId:user._id},process.env.secret_key)
                    res.cookie("token",token,{httpOnly:true})
                    return res.status(200).json({
                    success:true,
                    msg:"login succefull!",
                    token,
                    data:user
                }) 
            }
            else{
                return res.status(401).json({
                    success:false,
                    msg:"Invalid credentials"
                }) 
            }
        } 
              catch(error)
              {
                console.log(error);
                return res.status(500).json({
                    success:false,
                    msg:error.message
                }) 
              }
    } 
    exports.Logout=async(req,res)=>{
        res.clearCookie('token',{httpOnly:true}).json({msg:"Your Logout!"});

    }
    exports.getuser=async (req,res) => {
        try {
            let uid=req.params.id
            let user=await User.findById({_id:uid});
            res.status(200).json({
                msg:"user fetched",
                data:user
            })
        } 
        catch (error) {
            console.log(error)
            res.status(500).json({
                msg:'Internal server error'
            })
        }
      
    }