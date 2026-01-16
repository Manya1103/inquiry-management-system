import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("MongoDB connected successfully"));

        await mongoose.connect(`${process.env.MONGODB_URI}/Inquiry-management-system`, )
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // kills the process, signaling to the hosting platform (like AWS or Render) that it should try to restart the application to recover the connection if your app cannot connect to the database
    }
}

export default connectDB;