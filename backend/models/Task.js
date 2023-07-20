const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    title: {
        type: String,
        minLength: [6, "Title must Be least 6 Characters"],
        required: [true,"Please Enter task"],
      },
      description: {
        type: String,
        minLength: [6, "Description must Be least 6 Characters"],
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports= mongoose.model("Task", taskSchema);