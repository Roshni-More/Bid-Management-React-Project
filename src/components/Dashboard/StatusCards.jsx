import { FaList, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setStatusFilter, setPage } from "../../features/filters/filterSlice";
import { loadBidList } from "../../features/bids/bidThunk";
import { loadDashboardStats } from "../../features/dashboard/dashboardSlice";

const StatusCards = () => {
  const dispatch = useAppDispatch();

  const { stats } = useAppSelector((s) => s.dashboard);
  const selected = useAppSelector((s) => s.filters.selected);

  const apply = (statusPayload) => {
    dispatch(setStatusFilter(statusPayload));
    dispatch(setPage(1));
    dispatch(loadBidList());
    dispatch(loadDashboardStats());
  };

  const cards = [
    {
      title: "All Bids",
      count: stats?.totalBids ?? 0,
      icon: <FaList />,
      color: "#2563eb",
      active:
        !selected.Active &&
        !selected.ClosingSoon &&
        !selected.Expired,
      payload: {},
    },
    {
      title: "Active",
      count: stats?.activeBids ?? 0,
      icon: <FaCheckCircle />,
      color: "#22c55e",
      active: !!selected.Active,
      payload: { active: true },
    },
    {
      title: "Closing Soon",
      count: stats?.closingSoon ?? 0,
      icon: <FaClock />,
      color: "#f5970b",
      active: !!selected.ClosingSoon,
      payload: { closingSoon: true },
    },
    {
      title: "Expired",
      count: stats?.expiredBids ?? 0,
      icon: <FaTimesCircle />,
      color: "#ef4444",
      active: !!selected.Expired,
      payload: { expired: true },
    },
  ];

  return (
    <div className="row g-2 mb-3">
      {cards.map((card) => (
        <div className="col-6 col-lg-3" key={card.title}>
          <div
            onClick={() => apply(card.payload)}
            className="bg-white rounded-3 shadow-sm p-2 h-100"
            style={{
              cursor: "pointer",
              border: card.active
                ? `2px solid ${card.color}`
                : "2px solid transparent",
              transition: "0.3s",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">

              <div>

                <div
                  className="fw-semibold"
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  {card.title}
                </div>

                <div
                  className="fw-bold mt-2"
                  style={{
                    fontSize: "22px",
                    color: "#111827",
                  }}
                >
                  {card.count}
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

export default StatusCards;