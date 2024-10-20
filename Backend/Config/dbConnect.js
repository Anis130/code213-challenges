const mongoose = require("mongoose")

const dbConnect = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/movies")
    console.log("connected to database")
  } catch (error) {
    console.log("error connecting to database")
  }
}

module.exports = dbConnect