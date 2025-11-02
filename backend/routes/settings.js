const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Settings = require('../models/Settings');

// @route   GET api/settings
// @desc    Get user settings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user.id });
    if (!settings) {
      settings = new Settings({ user: req.user.id });
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/settings
// @desc    Update user settings
// @access  Private
router.put('/', auth, async (req, res) => {
  const {
    language,
    dateFormat,
    timeFormat,
    timeZone,
    defaultEventDuration,
    weekStart,
    showWeekends,
    workingHoursStart,
    workingHoursEnd,
    location,
    notifications,
    offlineMode,
  } = req.body;

  const settingsFields = {};
  if (language) settingsFields.language = language;
  if (dateFormat) settingsFields.dateFormat = dateFormat;
  if (timeFormat) settingsFields.timeFormat = timeFormat;
  if (timeZone) settingsFields.timeZone = timeZone;
  if (defaultEventDuration) settingsFields.defaultEventDuration = defaultEventDuration;
  if (weekStart) settingsFields.weekStart = weekStart;
  if (showWeekends !== undefined) settingsFields.showWeekends = showWeekends;
  if (workingHoursStart) settingsFields.workingHoursStart = workingHoursStart;
  if (workingHoursEnd) settingsFields.workingHoursEnd = workingHoursEnd;
  if (location) settingsFields.location = location;
  if (notifications) settingsFields.notifications = notifications;
  if (offlineMode !== undefined) settingsFields.offlineMode = offlineMode;

  try {
    let settings = await Settings.findOne({ user: req.user.id });

    if (settings) {
      // Update
      settings = await Settings.findOneAndUpdate(
        { user: req.user.id },
        { $set: settingsFields },
        { new: true }
      );
      return res.json(settings);
    }

    // Create
    settings = new Settings({
      ...settingsFields,
      user: req.user.id,
    });

    await settings.save();
    res.json(settings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;