const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const app = require("../index");
const Meeting = require("../models/meeting");
chai.use(chaiHttp);

describe("POST /meetings", () => {
  afterEach(async () => {
    await Meeting.deleteMany({});
  });

  it("should create a new meeting", async () => {
    const res = await chai.request(app).post("/meetings").send({
      date: "2023-04-01",
      start: "10:00",
      end: "11:00",
      room: "R1",
      attendees: "P1,P2",
    });

    expect(res).to.have.status(201);
    expect(res).to.have.property("text", "Meeting scheduled successfully");

    const meetings = await Meeting.find({});
    expect(meetings).to.have.lengthOf(1);
  });

  it("should return 400 if attendees are in incorrect format", async () => {
    const requestBody = {
      date: "2023-04-01",
      start: "10:00",
      end: "11:00",
      room: "R1",
      attendees: "P1,P2,P3,P6",
    };
    const response = await chai
      .request(app)
      .post("/meetings")
      .send(requestBody);

    expect(response).to.have.status(400);
    expect(response.text).to.equal("Incorrect format for Persons");
  });

  it("should return 400 if there is a time collision with an existing meeting", async () => {
    const meeting = new Meeting({
      date: "2023-04-01",
      start: "10:00",
      end: "11:00",
      room: "R1",
      attendees: "P1,P2,P3",
    });

    await meeting.save();

    const requestBody = {
      date: "2023-04-01",
      start: "10:40",
      end: "11:00",
      room: "R1",
      attendees: "P1,P2,P3",
    };
    const response = await chai
      .request(app)
      .post("/meetings")
      .send(requestBody);

    expect(response).to.have.status(400);
    expect(response.text).to.equal(
      "There is a time collision with an existing meeting"
    );
  });

  it("should return 400 if some attendees are not available at the requested time slot", async () => {
    const meeting = new Meeting({
      date: "2023-04-01",
      start: "10:00",
      end: "10:30",
      room: "R1",
      attendees: "P1",
    });

    await meeting.save();

    const requestBody = {
      date: "2023-04-01",
      start: "10:00",
      end: "11:00",
      room: "R2",
      attendees: "P1,P2,P3,P4",
    };
    const response = await chai
      .request(app)
      .post("/meetings")
      .send(requestBody);

    expect(response).to.have.status(400);
    expect(response.text).to.equal("P1  is not available at this time slot.");
  });
});
