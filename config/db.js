 import mongoose from "mongoose";
 const dbconnect = async () =>{
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("MONGO_URI not set in environment");
        process.exit(1);
    }
    console.log("Connecting to MongoDB using:", uri);
    try {
        await mongoose.connect(uri, {
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