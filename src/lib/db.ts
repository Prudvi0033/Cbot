import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Database already Connected");
    return;
  }

  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
      dbName: "Cbot",
    });

    console.log("Database Connected: ", conn.connection.host);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};
