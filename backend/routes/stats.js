// routes/stats.js
const express = require('express');
const router = express.Router();
const { getFreelancerStats, getClientStats } = require('../controllers/statsController');

router.get('/freelancer/:id', getFreelancerStats);
router.get('/client/:id', getClientStats);

module.exports = router;
