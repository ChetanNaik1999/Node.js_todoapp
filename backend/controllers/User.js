const User=require("../models/User.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
module.exports.createUser=async(req,res)=>{
    try {
        const { name ,email,password}=req.body;
        console.log("Enter")
        let user=await User.findOne({email});
        if(user){
            return res.status(401).json({
                success:false,
                message:"User alredy exist"
            });
        }
        console.log("here1");
        let hashPassword=await bcrypt.hash(password,10);
        console.log("here"+hashPassword);
        user=await User.create({
            name,email,password:hashPassword
        });
        console.log("here");
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.status(200).cookie("token",token,{
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
      success:true,
      message:"User Acccount Created",
      user
    });
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        });
    }
}


module.exports.login=async(req,res)=>{
    try {
        const { email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Does Not exist"
            });
        }
        let isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email or Password"
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.status(200).cookie("token",token,{
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
      success:true,
      message:"Log in Succesfully",
      user
    });
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        });
    }
}

module.exports.getMyProfile=(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    });
}


module.exports.logout=(req,res)=>{
    res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
     })
    .json({
      message:"log Out Successfully",
      success: true,
      user: req.user,
    });
}