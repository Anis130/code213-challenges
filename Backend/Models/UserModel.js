const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const Movie = require("./MovieModel");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Movie
  }],
  role: {
    type: String,
    default: "user"
  },
}, { timestamps: true })

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema)

module.exports = User