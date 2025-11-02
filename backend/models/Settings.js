const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  language: {
    type: String,
    default: 'en',
  },
  dateFormat: {
    type: String,
    default: 'MM/DD/YYYY',
  },
  timeFormat: {
    type: String,
    default: 'h:mm a',
  },
  timeZone: {
    type: String,
    default: 'UTC',
  },
  defaultEventDuration: {
    type: Number,
    default: 60,
  },
  weekStart: {
    type: String,
    default: 'sunday',
  },
  showWeekends: {
    type: Boolean,
    default: true,
  },
  workingHoursStart: {
    type: String,
    default: '09:00',
  },
  workingHoursEnd: {
    type: String,
    default: '17:00',
  },
  location: {
    type: String,
    default: '',
  },
  notifications: {
    email: { type: Boolean, default: true },
    desktop: { type: Boolean, default: true },
  },
  offlineMode: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Settings', SettingsSchema);