import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("MongoDB connected successfully"));

        await mongoose.connect(`${process.env.MONGODB_URI}/Inquiry-management-system`, )
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}

export default connectDB;