// controllers/UserController.js
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register new user (client or freelancer)
exports.register = async (req, res) => {
  try {
    const db = getDB();
    const { name, email, password, userType } = req.body;
    
    // Check if user exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user document with additional fields for profile
    const newUser = {
      name,
      email,
      password: hashedPassword,
      userType, // "freelancer" or "client"
      avatar: "",

      // Dynamic profile fields for both types
      title: userType === 'freelancer' ? 'Freelancer Title' : 'Client Title',
      location: "",
      phone: "",
      about: "",
      skills: [],
      education: [],
      experience: [],
      portfolio: [],
      
      // Stats fields (you can later update these from your project logic)
      totalEarnings: 0,
      ongoingProjects: 0,
      completedProjects: 0,
      averageRating: 0,
      monthlyEarnings: [],       // For freelancers
      pendingBids: 0,            // For freelancers
      
      totalSpending: 0,
      openProjects: 0,
      projectProgress: { completed: 0, total: 0 } // For clients
    };

    const result = await db.collection('users').insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login and return JWT token
exports.login = async (req, res) => {
  try {
    const db = getDB();
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    // Remove sensitive info before returning
    delete user.password;
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch user profile (for both freelancer and client)
exports.getUser = async (req, res) => {
  try {
    const db = getDB();
    const userId = req.params.id;
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    delete user.password;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile (editable fields: experience, education, portfolio, about, etc.)
exports.updateUser = async (req, res) => {
  try {
    const db = getDB();
    const userId = req.params.id;
    const updateData = req.body;
    
    // If password is updated, hash it before storing
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
