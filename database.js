const dotEnv = require("dotenv");
dotEnv.config();
//console.log(process.env.MONGO_DB_URL); - i use this console.log only to use my credentials and do not keep it in the code

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Database connection could not be established!");
  }
};

module.exports = connectDB;
