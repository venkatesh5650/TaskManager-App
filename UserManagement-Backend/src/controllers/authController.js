const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Handles user signup: validates input, checks duplicate email, hashes password, stores user, returns JWT
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic field validation
    if (!name || !email || !password)
      return res.status(400).json({ msg: 'All fields required' });

    // Ensure email is unique
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ msg: 'Email already used' });

    // Securely hash password
    const hash = await bcrypt.hash(password, 10);

    // Create new user record
    const user = await User.create({ name, email, password: hash });

    // Create JWT valid for 7 days
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send token and public user data
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });

  } catch (err) {
    console.error(err); // Log for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

// Handles login: verifies credentials, returns JWT if valid
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare hashed password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate login token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return token and basic user info
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Returns authenticated user's profile (set by auth middleware)
const getProfile = (req, res) => {
  res.json({ user: req.user });
};

module.exports = { signup, login, getProfile };
