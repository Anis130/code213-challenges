const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role matches any of the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You don't have permission to access this route" });
    }
    next();
  };
};

module.exports = { restrictTo };
