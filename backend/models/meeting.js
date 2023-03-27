const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  room: {
    type: String,
  },
  attendees: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Meeting", meetingSchema);
