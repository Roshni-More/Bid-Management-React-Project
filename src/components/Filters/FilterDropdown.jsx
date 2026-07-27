

const FilterDropdown = ({ label, value, options, onChange, loading, disabled }) => {
  return (
    <div>
      <label className="form-label text-uppercase text-muted small mb-1">{label}</label>
      <select
        className="form-select form-select-sm"
        value={value || ""}
        disabled={disabled || loading}
        onChange={(e) => onChange(e.target.value || undefined)}
      >
        <option value="">{loading ? "Loading..." : `All ${label}`}</option>
        {(options || []).map((opt) => {
          const name = typeof opt === "string" ? opt : opt.name;
          const count = typeof opt === "string" ? null : opt.count;
          return (
            <option key={name} value={name}>
              {name}{count !== null ? ` (${count})` : ""}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterDropdown;