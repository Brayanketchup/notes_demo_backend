import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please define MONGODB_URI in your .env");
}

mongoose
  .connect(uri, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

export default mongoose;