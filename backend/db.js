const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB connected");
  } catch (e) {
    console.log("Failed to connect to MongoDB, error ", e);
    process.exit(1);
  }
};

const close = () => {
  mongoose.disconnect();
};

module.exports = { connectDB, close };
