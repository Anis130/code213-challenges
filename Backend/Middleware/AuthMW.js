const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const protect = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  // Check for the token in the Authorization header
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the authenticated user to the request object (excluding the password)
    req.user = await User.findById(decoded.id).select("-password");

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
}

module.exports = { protect, admin };
