import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;


export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'care-connect', 
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1); 
  }
};