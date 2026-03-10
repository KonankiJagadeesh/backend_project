 import mongoose from "mongoose";
 const dbconnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
        console.log("Database Connected Successfully");
    } catch (err) {
        console.error("Database Connection Error:", err.message);
        process.exit(1);
    }
 };

 export default dbconnect;