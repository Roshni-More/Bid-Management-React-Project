// import React from "react";

const ErrorDisplay = ({ message, onRetry }) => (
  <div className="alert alert-danger d-flex justify-content-between align-items-center rounded-3 shadow-sm">
    <span>{message}</span>
    {onRetry && (
      <button className="btn btn-sm btn-outline-danger" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);

export default ErrorDisplay;