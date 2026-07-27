// import React from "react";

const NoData = ({ message = "No records found" }) => (
  <div className="text-center text-muted py-5">
    <div>{message}</div>
  </div>
);

export default NoData;