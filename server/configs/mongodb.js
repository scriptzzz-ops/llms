import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('✅ Database Connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/lms`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
