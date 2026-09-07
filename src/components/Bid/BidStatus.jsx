import { STATUS_DOT_COLORS } from "../../constants/statusColors";

const BidStatus = ({ status }) => {
  const color =
    STATUS_DOT_COLORS[status] || STATUS_DOT_COLORS.Active;

  const label =
    status === "ClosingSoon" ? "Closing Soon" : status;

  return (
    <span className="d-inline-flex align-items-center gap-2">

      {/* Status Dot */}
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
          flexShrink: 0,
        }}
      />

      {/* Status Text */}
      <span
        style={{
          color: "#111827",
          fontWeight: "700",
          fontSize: "14px",
        }}
      >
        {label}
      </span>

    </span>
  );
};

export default BidStatus;