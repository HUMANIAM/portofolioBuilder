import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCredentials = async (req, res) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ message: 'Please enter your current password.' });
    }

    if (!newUsername && !newPassword) {
      return res.status(400).json({ message: 'Enter a new username and/or a new password to make changes.' });
    }

    if (newPassword && newPassword.length < 6) {
      return res.status(400).json({ message: 'Your new password must be at least 6 characters long.' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'The current password you entered is incorrect.' });
    }

    if (newUsername) {
      const existingUser = await User.findOne({ username: newUsername });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'That username is already taken. Please choose another.' });
      }
      user.username = newUsername;
    }

    if (newPassword) {
      user.password = newPassword;
    }

    await user.save();

    res.json({
      message: 'Credentials updated successfully. Please sign in again with your new details.',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Update credentials error:', error);
    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0]?.message || 'Validation failed';
      return res.status(400).json({ message: firstError });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
