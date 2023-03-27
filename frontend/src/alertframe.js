import React from "react";
import "./alertframe.css";

const AlertFrame = ({ color, message }) => {
  return (
    <div className="errorbox" style={{ backgroundColor: color }}>
      <p className="message">{message}</p>
    </div>
  );
};

export default AlertFrame;
