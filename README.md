
# Meeting Scheduling System

This project is a simple meeting scheduling system that allows a user to schedule a meeting with one or more people, and checks for time and room availability.

The system has two implementations:

1 Basic Implementation for one person (P1).

The basic implementation of the system allows a user to schedule a meeting with the following inputs:

Date
Start time and End time (or a time slot)
Room ID from a fixed set: (R1, R2, R3, R4, R5)
The system checks for any time collisions when scheduling a new meeting.

2 Advanced Implementation for multiple people (P1, P2, P3, P4, P5)

The advanced implementation of the system allows a user to schedule a meeting with one or more people. The inputs for scheduling a meeting include:

Date
Start time and End time (or a time slot)
Room ID from a fixed set: (R1, R2, R3, R4, R5)
Other person(s) in meeting as a parameter in a comma-separated form.
The system checks for the availability of other people during the scheduled time slot, and also checks for any time and room collisions.


<img width="824" alt="image" src="https://user-images.githubusercontent.com/63876450/227867866-a4624ef5-926e-49cd-a99b-0e70a733f23c.png">
<img width="827" alt="image" src="https://user-images.githubusercontent.com/63876450/227867599-16118b5b-e95e-4908-8b05-3118e3813901.png">


## API Reference


```
  POST /meetings
```
This API endpoint creates a new meeting with the given parameters: date, start time, end time, room, and attendees list.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `string` | The date of the meeting in the format "DD-MM-YYYY" |
| `start`      | `string` | The start time of the meeting in the format "HH:MM" |
| `end`      | `string` | The end time of the meeting in the format "HH:MM" |
| `room`      | `string` | The ID of the room where the meeting will take place |
| `attendees`      | `string` | Person(s) in meeting in a comma separated form ex P1,P2,P3... |


## Run 

Clone the project

```bash
  git clone https://github.com/sarang721/MeetApp
```
Go to the project directory

```bash
  cd MeetApp
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd backend
  npm run start
```
Start the frontend

```bash
  cd frontend
  npm run start
```

Run tests

```bash
  cd backend
  npm run test
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL - URL or connection string used to connect to a MongoDB database.`









