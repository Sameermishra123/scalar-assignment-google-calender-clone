const mongoose = require('mongoose');

const recurrenceRuleSchema = new mongoose.Schema({
  frequency: {
    type: String,
    enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
    default: 'DAILY'
  },
  interval: {
    type: Number,
    default: 1
  },
  count: {
    type: Number,
    default: null
  },
  until: {
    type: Date,
    default: null
  },
  byDay: [{
    type: String,
    enum: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']
  }],
  byMonthDay: [Number],
  byMonth: [Number]
}, { _id: false });

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  calendarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calendar',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  allDay: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#1a73e8'
  },
  location: {
    type: String,
    default: ''
  },
  recurrence: {
    type: recurrenceRuleSchema,
    default: null
  },
  timezone: {
    type: String,
    default: 'GMT+05:30'
  }
}, {
  timestamps: true
});

// Index for efficient queries
eventSchema.index({ userId: 1, start: 1, end: 1 });
eventSchema.index({ calendarId: 1 });

module.exports = mongoose.model('Event', eventSchema);
