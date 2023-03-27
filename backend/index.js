const express = require("express");
const Meeting = require("./models/meeting");
const cors = require("cors");
const app = express();
const dotenv=require('dotenv');
const {connectDB}=require("./db");

dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.post("/meetings", async (req, res) => {
  let flag = 0;
  const { date, start, end, room, attendees } = req.body;
  const attendeesarr = attendees.replace(/ /g, "").split(",");
  attendeesarr.forEach((val) => {
    if (
      !(val == "P1" || val == "P2" || val == "P3" || val == "P4" || val == "P5")
    ) {
      flag = 1;
    }
  });

  if (flag == 1) {
    return res.status(400).send("Incorrect format for Persons");
  }

  try {
    const overlappingMeetings = await Meeting.find({
      date,
      $or: [
        { room: { $eq: room }, start: { $lt: end }, end: { $gt: start } },
        { room: { $eq: room }, start: { $lte: start }, end: { $gte: end } },
      ],
    });

    if (overlappingMeetings.length === 0) {
      const meeting = new Meeting({
        attendees: attendeesarr,
        date: date,
        start: start,
        end: end,
        room: room,
      });

      let unabletoattend = "";
      for (const attendee of attendeesarr) {
        const overlappingMeetings = await Meeting.find({
          date: { $eq: date },
          attendees: { $in: [attendee] },
          $or: [
            { start: { $lt: end }, end: { $gt: start } },
            { start: { $lte: start }, end: { $gte: end } },
          ],
        });

        if (overlappingMeetings.length > 0) {
          unabletoattend += attendee + " ";
        }
      }
      if (unabletoattend.length > 0) {
        return res
          .status(400)
          .send(`${unabletoattend} is not available at this time slot.`);
      }
      await meeting.save();
      return res.status(201).send("Meeting scheduled successfully");
    } else {
      return res
        .status(400)
        .send("There is a time collision with an existing meeting");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

module.exports=app;