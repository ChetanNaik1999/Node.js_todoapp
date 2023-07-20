const express=require("express");
const Task=require("../models/Task.js");

module.exports.createNewNote=async(req,res)=>{
    try {
        const { title,description}=req.body;
        await Task.create({
          title,description,user:req.user._id
        });
        return res.status(201).json({
            success:true,
            message:"Task Created Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports.getMyNotes=async(req,res)=>{
    try {
        const userId=req.user._id;
        let tasks=await Task.find({user:userId});
        return res.status(200).json({
            success:true,
            task:tasks
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


module.exports.updateTask=async(req,res)=>{
    try {
        const { title,description}=req.body;
        let task=await Task.findById(req.params.id);
        if(!task){
            return res.status(400).json({
                success:false,
                message:"Task Not found"
            }); 
        }
        if(title){
            task.title=title;
        }
        if(description){
            task.description=description;
        }
        await task.save();

        return res.status(200).json({
            success:false,
            message:"Task Updated!"
        }); 
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
module.exports.deleteTask=async(req,res)=>{
    try {
        let deleteTask=await Task.findOneAndDelete(req.params.id);
        if(!deleteTask){
            return res.status(400).json({
                success:false,
                message:"Task Not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Task Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
