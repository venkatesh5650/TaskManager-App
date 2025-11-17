const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Auth middleware: validates JWT and attaches authenticated user to request
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Require Authorization header
  if (!authHeader) return res.status(401).json({ msg: "No token" });

  // Extract Bearer token
  const token = authHeader.split(" ")[1];

  try {
    // Verify signature + expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the token belongs to a valid user
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ msg: "Invalid token" });

    // Attach user instance to request for later controllers
    req.user = user;

    next(); // Continue to protected route

  } catch (err) {
    return res.status(401).json({ msg: "Token error" }); // Expired or malformed token
  }
};

module.exports = auth;
