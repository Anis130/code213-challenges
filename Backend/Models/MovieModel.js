const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 0, // Ensuring duration is non-negative
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String], // Array of strings to allow multiple categories
    required: true,
  },
  rating: {
    average: {
      type: Number,
      min: 0,
      max: 10,
    },
    votes: {
      type: Number,
      min: 0,
    },
  },
  poster: {
    type: String,
    default: "default"
  },
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie