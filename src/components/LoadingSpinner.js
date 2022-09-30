import React from "react";
import "../styles/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading">
      <svg width="16px" height="12px">
        <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
        <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
