const app=require('./app.js');
const connectToDatabase = require('./config/db');

// const PORT=5000;

connectToDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode` );
});