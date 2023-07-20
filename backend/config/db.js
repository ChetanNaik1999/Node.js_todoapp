const mongoose=require('mongoose');

const connectToDatabase=()=>{
    mongoose.connect(process.env.MONGO_URI).then((data)=>{
       console.log(data.connection.host);
    }).catch((error)=>{
       console.log(error.message);
    });
}

module.exports=connectToDatabase;