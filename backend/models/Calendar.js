const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    default: 'My Calendar'
  },
  color: {
    type: String,
    default: '#1a73e8'
  },
  visible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Calendar', calendarSchema);
