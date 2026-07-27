
import { STATUS_DOT_COLORS } from "../../constants/statusColors";

const BidStatus = ({ status }) => {
  const color = STATUS_DOT_COLORS[status] || STATUS_DOT_COLORS.Active;
  const label = status === "ClosingSoon" ? "Closing Soon" : status;

  return (
    <span className="d-inline-flex align-items-center gap-2">
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
        }}
      />
      <span className="small text-muted">{label}</span>
    </span>
  );
};

export default BidStatus;