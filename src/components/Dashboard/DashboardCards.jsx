import {
  FaCalendarWeek,
  FaCalendarAlt,
  FaCalendar,
  FaRupeeSign,
  FaList,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { formatCurrency } from "../../utils/formatters";
import Loader from "../Common/Loader";
import { setStatusFilter, setPage } from "../../features/filters/filterSlice";
import { loadBidList } from "../../features/bids/bidThunk";
import { loadDashboardStats } from "../../features/dashboard/dashboardSlice";

const DashboardCards = () => {
  const dispatch = useAppDispatch();

  const { stats, loading, error } = useAppSelector((s) => s.dashboard);
  const selected = useAppSelector((s) => s.filters.selected);
  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!stats) return null;

  const weeklyTotal =
    stats.weeklyBids?.[stats.weeklyBids.length - 1]?.count ?? 0;

  const monthlyTotal =
    stats.monthlyBids?.[stats.monthlyBids.length - 1]?.count ?? 0;

  const yearlyTotal =
    stats.yearlyBids?.[stats.yearlyBids.length - 1]?.count ?? 0;
  const apply = (payload) => {
    dispatch(setStatusFilter(payload));
    dispatch(setPage(1));
    dispatch(loadBidList());
    dispatch(loadDashboardStats());
  };

  const cards = [
    {
      title: "Weekly",
      value: weeklyTotal,
      color: "#06b6d4",
      icon: <FaCalendarWeek />,
    },
    {
      title: "Monthly",
      value: monthlyTotal,
      color: "#7c3aed",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Yearly",
      value: yearlyTotal,
      color: "#374151",
      icon: <FaCalendar />,
    },
    {
      title: "All Bids",
      value: stats.totalBids ?? 0,
      color: "#2563eb",
      icon: <FaList />,
      active:
        !selected.Active &&
        !selected.ClosingSoon &&
        !selected.Expired,
      payload: {},
    },
    {
      title: "Active",
      value: stats.activeBids ?? 0,
      color: "#22c55e",
      icon: <FaCheckCircle />,
      active: !!selected.Active,
      payload: { active: true },
    },
    {
      title: "Closing Soon",
      value: stats.closingSoon ?? 0,
      color: "#e9f50b",
      icon: <FaClock />,
      active: !!selected.ClosingSoon,
      payload: { closingSoon: true },
    },
    {
      title: "Expired",
      value: stats.expiredBids ?? 0,
      color: "#ef4444",
      icon: <FaTimesCircle />,
      active: !!selected.Expired,
      payload: { expired: true },
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
        <div className="col-6 col-md-3 col-lg" key={card.title}>
          <div
            onClick={card.payload ? () => apply(card.payload) : undefined}
            className="bg-white rounded-3 shadow-sm px-2 py-1 h-100"
            style={{
              cursor: card.payload ? "pointer" : "default",
              borderLeft: `4px solid ${card.color}`,
              border: card.active
                ? `2px solid ${card.color}`
                : "1px solid #e5e7eb",
              minHeight: "60px",
              transition: ".3s",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">

              <div>
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "11px",
                  }}
                >
                  {card.title}
                </div>

                <div
                  className="fw-bold"
                  style={{
                    fontSize:
                      card.title === "Estimated Value"
                        ? "17px"
                        : "20px",
                    color: "#111827",
                    marginTop: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.value}
                </div>
              </div>

              <div
                style={{
                  fontSize: "18px",
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