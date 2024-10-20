const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken");

// sign JWT
const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// create user
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    // verifying if user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // creating user
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      role: role
    })

    // saving user in database
    await newUser.save()

    res.status(201).json({ message: "User created", user: newUser })
  } catch (error) {
    res.status(500).json({ message: "server error", error: error })
  }
}

// login
const login = async (req, res) => {
  try {
    const {
      email, password
    } = req.body

    // checking if user doesnt exist
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ message: "User does not exist" })
    }

    // verifying password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generating JWT token
    const token = signToken(user);

    return res.status(200).json({ message: "Login successful", token, user: { username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error })
  }
}

module.exports = { register, login }