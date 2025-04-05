// controllers/StatsController.js
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

exports.getFreelancerStats = async (req, res) => {
  try {
    const db = getDB();
    const userId = req.params.id;
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.userType !== 'freelancer') return res.status(400).json({ message: 'Not a freelancer' });
    
    // Compose stats from dynamic fields
    const stats = {
      totalEarnings: user.totalEarnings || 0,
      ongoingProjects: user.ongoingProjects || 0,
      completedProjects: user.completedProjects || 0,
      averageRating: user.averageRating || 0,
      monthlyEarnings: user.monthlyEarnings || [],
      pendingBids: user.pendingBids || 0,
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClientStats = async (req, res) => {
  try {
    const db = getDB();
    const userId = req.params.id;
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.userType !== 'client') return res.status(400).json({ message: 'Not a client' });
    
    // Compose client stats from dynamic fields
    const stats = {
      totalSpending: user.totalSpending || 0,
      ongoingProjects: user.ongoingProjects || 0,
      completedProjects: user.completedProjects || 0,
      openProjects: user.openProjects || 0,
      projectProgress: user.projectProgress || { completed: 0, total: 0 }
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
