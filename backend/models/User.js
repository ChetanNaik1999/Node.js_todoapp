const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength: [6, "Name Should be Of Length 6 Characters"],
        required:[true,"Please enter Your Name"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please Enter Your Email"]
    },
    password:{
        type:String,
        minLength: [6, "Paswsord must Be least 6 Characters"],
        required:[true,"Please Enter Your Password"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model("User", userSchema);