import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Validate env
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables");
    }

    // Basic URI format check
    if (!process.env.MONGO_URI.includes("mongodb")) {
      throw new Error("Invalid MONGO_URI format");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ShebaLinkDB",
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);

    // process.exit(1);
  }
};

export default connectDB;
