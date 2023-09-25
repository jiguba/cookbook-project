import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Connected to mongoDB!")
    return;
  }

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected === 1) {
        console.log("Successfully connected to MongoDB!");
      } else {
        console.error("Failed to connect to MongoDB.");
      }
  }
}

export default connectDb;