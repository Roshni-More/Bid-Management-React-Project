// import React from "react";

const Loader = ({ size = "md", label }) => {
  const spinnerClass = size === "sm" ? "spinner-border spinner-border-sm" : "spinner-border";
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 py-3">
      <div className={`${spinnerClass} text-primary`} role="status" />
      {label && <span className="text-muted small">{label}</span>}
    </div>
  );
};

export default Loader;