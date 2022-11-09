import mongoose from "mongoose";

const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.black);
        
    } catch (err) {
        
        console.log(`MongoDB Disconnected: ${err}`.bgRed.black);
        process.exit(1);
    }
}


export default connectDB;