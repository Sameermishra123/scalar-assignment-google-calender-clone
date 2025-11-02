const express = require('express');
const { body, validationResult } = require('express-validator');
const Calendar = require('../models/Calendar');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/calendars
// @desc    Get all calendars for a user
router.get('/', auth, async (req, res) => {
  try {
    const calendars = await Calendar.find({ userId: req.userId }).sort({ createdAt: 1 });
    res.json(calendars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/calendars
// @desc    Create a new calendar
router.post('/', [
  auth,
  body('name').trim().notEmpty().withMessage('Calendar name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, color, visible } = req.body;

    const calendar = new Calendar({
      userId: req.userId,
      name,
      color: color || '#1a73e8',
      visible: visible !== undefined ? visible : true
    });

    await calendar.save();
    res.status(201).json(calendar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/calendars/:id
// @desc    Update a calendar
router.put('/:id', auth, async (req, res) => {
  try {
    const calendar = await Calendar.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!calendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }

    const { name, color, visible } = req.body;

    if (name) calendar.name = name;
    if (color) calendar.color = color;
    if (visible !== undefined) calendar.visible = visible;

    await calendar.save();
    res.json(calendar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/calendars/:id
// @desc    Delete a calendar
router.delete('/:id', auth, async (req, res) => {
  try {
    const calendar = await Calendar.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!calendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }

    await calendar.deleteOne();
    res.json({ message: 'Calendar deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
