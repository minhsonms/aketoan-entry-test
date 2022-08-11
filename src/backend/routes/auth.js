/* eslint-disable no-underscore-dangle */
import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import verifyToken from '../middleware/auth';

const router = express.Router();

// GET api/auth
// Check if user is logged in
// eslint-disable-next-line consistent-return
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    console.info(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST api/auth/register
// Register user
// eslint-disable-next-line consistent-return
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) return res.status(400).json({ success: false, message: 'Missing username and/or password' });

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    if (user) return res.status(400).json({ success: false, message: 'Username already taken' });

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

    res.json({
      success: true,
      message: 'User created successfully',
      accessToken,
    });
  } catch (error) {
    console.info(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST api/auth/login
// Login user
// eslint-disable-next-line consistent-return
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) return res.status(400).json({ success: false, message: 'Missing username and/or password' });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: 'Incorrect username or password' });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) return res.status(400).json({ success: false, message: 'Incorrect username or password' });

    // All good
    // Return token
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

    res.json({
      success: true,
      message: 'User logged in successfully',
      accessToken,
    });
  } catch (error) {
    console.info(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
