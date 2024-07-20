import mongoose from "mongoose";
import { DB_NAME } from "../constrains.js";

const connectDB = async () => {
    try {
        const dburl = "mongodb+srv://ujjwalkur428:ujjwal1234@cluster0.5m73glo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        const dbconnection = await mongoose.connect(`${dburl}/${DB_NAME}`);
        console.log(`database connected! DB_HOST ${dbconnection.connection.host}`);
    }
    catch (error) {
        console.log("Connection Error", error);
        process.exit(1)
    }
}

export default connectDB