const mongoose = require("mongoose");
require("dotenv").config();
// import mongoose from "mongoose";

function dbConnect() {
  try {
    mongoose.connect(process.env.MONGODB_URL, {});
    console.log("mongodb connected");
  } catch (error) {
    console.log("Error connecting mongodb", error);
  }
}
module.exports = dbConnect; //for common js
// export default dbConnect; //for ecma script modules
