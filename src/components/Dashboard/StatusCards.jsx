// import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setStatusFilter, setPage } from "../../features/filters/filterSlice";
import { loadBidList } from "../../features/bids/bidThunk";
import { loadDashboardStats } from "../../features/dashboard/dashboardSlice";
import Loader from "../Common/Loader";

const StatusCards = () => {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((s) => s.dashboard);
  const selected = useAppSelector((s) => s.filters.selected);

  if (loading) return <Loader label="Loading status..." />;
  if (!stats) return null;

  const apply = (statusPayload) => {
    dispatch(setStatusFilter(statusPayload));
    dispatch(setPage(1));
    dispatch(loadBidList());
    dispatch(loadDashboardStats());
  };

  const isActiveTab = (key) => {
    if (key === "all") return !selected.Active && !selected.ClosingSoon && !selected.Expired;
    if (key === "active") return !!selected.Active;
    if (key === "closing") return !!selected.ClosingSoon;
    if (key === "expired") return !!selected.Expired;
  };

  const tabClass = (active) =>
    `btn btn-sm ${active ? "btn-primary" : "btn-outline-secondary"} rounded-pill d-flex align-items-center gap-2`;

  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      <button className={tabClass(isActiveTab("all"))} onClick={() => apply({})}>
        All Bids <span className="badge bg-light text-dark">{stats.totalBids}</span>
      </button>
      <button className={tabClass(isActiveTab("active"))} onClick={() => apply({ active: true })}>
        Active <span className="badge bg-light text-dark">{stats.activeBids}</span>
      </button>
      <button className={tabClass(isActiveTab("closing"))} onClick={() => apply({ closingSoon: true })}>
        Closing Soon <span className="badge bg-light text-dark">{stats.closingSoon}</span>
      </button>
      <button className={tabClass(isActiveTab("expired"))} onClick={() => apply({ expired: true })}>
        Expired <span className="badge bg-light text-dark">{stats.expiredBids}</span>
      </button>
    </div>
  );
};

export default StatusCards;