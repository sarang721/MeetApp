import "./App.css";
import { React, useState } from "react";
import axios from "axios";
import AlertFrame from "./alertframe";

function App() {
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [message, setMessage] = useState("");
  const [attendees, setAttendees] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [color, setcolor] = useState();
  const todayDate = new Date().toISOString().substr(0, 10);
  const API = axios.create({ baseURL: "http://localhost:5000" });

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await API.post("/meetings", {
        date: date,
        start: start,
        end: end,
        room: selectedOption,
        attendees: attendees,
      });
      setMessage(response.data);
      if(response.status===400)
      setcolor("red");
      else
      setcolor("green");
    } catch (error) {
      setMessage(error.response.data);
      setcolor("red");
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
    
  };

  return (
    <div>
      <div className="app">
        <h1>Schedule a Meeting</h1>
        <div className="inputfields">
          <form onSubmit={handleSubmit}>
            <div className="divs">
              <label>Date:</label>
              <br></br>
              <input
                type="date"
                value={date}
                min={todayDate}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>
            <div>
              <label>Start Time : </label>
              <br></br>
              <input
                type="time"
                value={start}
                onChange={(event) => setStart(event.target.value)}
                required
              />
            </div>
            <div>
              <label>End Time : </label>
              <br></br>
              <input
                type="time"
                value={end}
                onChange={(event) => setEnd(event.target.value)}
                required
              />
            </div>
            <div>
              <label>Persons :</label>
              <br></br>
              <input
                type="text"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Room ID</label>
              <br></br>
              <select value={selectedOption} onChange={handleSelectChange}>
                <option>Select Option</option>
                <option value="R1">R1</option>
                <option value="R2">R2</option>
                <option value="R3">R3</option>
                <option value="R4">R4</option>
                <option value="R5">R5</option>
              </select>
              <div>
                <button onClick={handleSubmit}>Schedule</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {message && <AlertFrame message={message} color={color}></AlertFrame>}
    </div>
  );
}

export default App;
