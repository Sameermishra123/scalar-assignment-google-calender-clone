const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const Calendar = require('../models/Calendar');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events for a user within a date range
router.get('/', auth, async (req, res) => {
  try {
    const { start, end, calendarIds } = req.query;
    
    let query = { userId: req.userId };
    
    if (start && end) {
      query.$or = [
        { start: { $gte: new Date(start), $lte: new Date(end) } },
        { end: { $gte: new Date(start), $lte: new Date(end) } },
        { start: { $lte: new Date(start) }, end: { $gte: new Date(end) } }
      ];
    }
    
    if (calendarIds) {
      const ids = calendarIds.split(',').filter(id => id);
      if (ids.length > 0) {
        query.calendarId = { $in: ids };
      }
    }
    
    const events = await Event.find(query)
      .populate('calendarId', 'name color visible')
      .sort({ start: 1 });
    
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/events/:id
// @desc    Get a single event
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      userId: req.userId
    }).populate('calendarId', 'name color visible');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events
// @desc    Create a new event
router.post('/', [
  auth,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('start').isISO8601().withMessage('Valid start date is required'),
  body('end').isISO8601().withMessage('Valid end date is required'),
  body('calendarId').notEmpty().withMessage('Calendar ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, start, end, allDay, color, location, calendarId, recurrence, timezone } = req.body;
    
    // Verify calendar belongs to user
    const calendar = await Calendar.findOne({ _id: calendarId, userId: req.userId });
    if (!calendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }

    const event = new Event({
      userId: req.userId,
      calendarId,
      title,
      description: description || '',
      start: new Date(start),
      end: new Date(end),
      allDay: allDay || false,
      color: color || calendar.color,
      location: location || '',
      recurrence: recurrence || null,
      timezone: timezone || 'GMT+05:30'
    });

    await event.save();
    await event.populate('calendarId', 'name color visible');
    
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
router.put('/:id', [
  auth,
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('start').optional().isISO8601().withMessage('Valid start date is required'),
  body('end').optional().isISO8601().withMessage('Valid end date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, description, start, end, allDay, color, location, calendarId, recurrence, timezone } = req.body;

    if (title) event.title = title;
    if (description !== undefined) event.description = description;
    if (start) event.start = new Date(start);
    if (end) event.end = new Date(end);
    if (allDay !== undefined) event.allDay = allDay;
    if (color) event.color = color;
    if (location !== undefined) event.location = location;
    if (recurrence !== undefined) event.recurrence = recurrence;
    if (timezone) event.timezone = timezone;
    
    if (calendarId && calendarId !== event.calendarId.toString()) {
      const calendar = await Calendar.findOne({ _id: calendarId, userId: req.userId });
      if (!calendar) {
        return res.status(404).json({ message: 'Calendar not found' });
      }
      event.calendarId = calendarId;
    }

    await event.save();
    await event.populate('calendarId', 'name color visible');
    
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/events/search/:query
// @desc    Search events
router.get('/search/:query', auth, async (req, res) => {
  try {
    const query = req.params.query;
    const events = await Event.find({
      userId: req.userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } }
      ]
    })
      .populate('calendarId', 'name color visible')
      .sort({ start: 1 });
    
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
