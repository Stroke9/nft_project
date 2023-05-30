import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  if(mongoose.connection.readyState === 1) {
    console.log("Mongo already connected");
    return mongoose.connection.asPromise();
  }
  console.log("connection to Mongo");
  return await mongoose.connect(URI as string)
}
export default connectDB;