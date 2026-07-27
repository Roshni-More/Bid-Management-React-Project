// import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { formatCurrency } from "../../utils/formatters";
import Loader from "../Common/Loader";

const DashboardCards = () => {
  const { stats, loading, error } = useAppSelector((s) => s.dashboard);

  if (loading) return <Loader label="Loading dashboard..." />;
  if (error) return <div className="text-danger small">{error}</div>;
  if (!stats) return null;

  const cards = [
    { label: "Total Ministries", value: stats.totalMinistries },
    { label: "Total Departments", value: stats.totalDepartments },
    { label: "Total Organisations", value: stats.totalOrganisations },
    { label: "Total Estimated Value", value: formatCurrency(stats.totalEstimatedValue) },
  ];

  return (
    <div className="row g-3 mb-3">
      {cards.map((c) => (
        <div className="col-6 col-md-3" key={c.label}>
          <div className="bg-white border rounded-3 shadow-sm p-3 h-100">
            <div className="text-muted small">{c.label}</div>
            <div className="fs-5 fw-bold">{c.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;