const mongoose = require('mongoose');

const connectDB =async()=>{
    try {
await mongoose.connect(process.env.MONGODB_URI)
const connection = mongoose.connection;

connection.once("connected",()=>{
    console.log("Connected to database");
})

connection.on("error",()=>{
    console.log("Something went wrong in connecting to database", error);
})


        
    } catch (error) {
       console.log("Error in connecting to database",error); 
    }
}

module.exports = connectDB;