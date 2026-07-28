import { useAppSelector } from "../../hooks/reduxHooks";
import { formatCurrency } from "../../utils/formatters";
import Loader from "../Common/Loader";

import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFileAlt,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCalendar,
  FaRupeeSign,
} from "react-icons/fa";

const DashboardCards = () => {
  const { stats, loading, error } = useAppSelector((s) => s.dashboard);

  if (loading) return <Loader label="Loading Dashboard..." />;
  if (error) return <div className="text-danger">{error}</div>;
  if (!stats) return null;

  const cards = [
    // {
    //   title: "Active Bids",
    //   value: stats.activeBids ?? 0,
    //   color: "#22c55e",
    //   icon: <FaCheckCircle />,
    // },
    // {
    //   title: "Closing Soon",
    //   value: stats.closingSoon ?? 0,
    //   color: "#f59e0b",
    //   icon: <FaClock />,
    // },
    // {
    //   title: "Expired Bids",
    //   value: stats.expiredBids ?? 0,
    //   color: "#ef4444",
    //   icon: <FaTimesCircle />,
    // },
    // {
    //   title: "Total Bids",
    //   value: stats.totalBids ?? 0,
    //   color: "#2563eb",
    //   icon: <FaFileAlt />,
    // },
    {
      title: "Weekly",
      value: stats.weeklyBids ?? 0,
      color: "#06b6d4",
      icon: <FaCalendarWeek />,
    },
    {
      title: "Monthly",
      value: stats.monthlyBids ?? 0,
      color: "#7c3aed",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Yearly",
      value: stats.yearlyBids ?? 0,
      color: "#374151",
      icon: <FaCalendar />,
    },
    {
      title: "Estimated Value",
      value: formatCurrency(stats.totalEstimatedValue ?? 0),
      color: "#16a34a",
      icon: <FaRupeeSign />,
    },
  ];

  return (
<div className="row g-2 mb-2">
      {cards.map((card) => (
        <div className="col-6 col-lg-3" key={card.title}>
          <div
        className="bg-white rounded-3 shadow-sm p-2 h-100"
            style={{
              borderLeft: `5px solid ${card.color}`,
              minHeight: "72px",
              transition: ".3s",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div
                  className="text-secondary fw-semibold"
                  style={{ fontSize: "12px" }}
                >
                  {card.title}
                </div>

                <div
                  className="fw-bold mt-2"
                  style={{
                    fontSize: "22px",
                    color: "#1f2937",
                  }}
                >
                  {card.value}
                </div>
              </div>

              <div
                style={{
                  fontSize: "22px",
                  color: card.color,
                }}
              >
                {card.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;