const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route   GET api/holidays
// @desc    Get public holidays for the current year for India
// @access  Public
router.get('/', async (req, res) => {
  const year = new Date().getFullYear();
  try {
    const response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/IN`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ msg: 'Holidays not found for the current year' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;