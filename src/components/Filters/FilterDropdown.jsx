const FilterDropdown = ({
    label,
    value,
    options,
    onChange,
    loading,
    disabled
}) => {
    return (
        <div>
            <label
                className="form-label mb-1"
                style={{
                    textTransform: "none",
                    fontSize: "12px",
                    fontWeight: "500"
                }}
            >
                {label}
            </label>

            <select
                className="form-select form-select-sm"
                value={value || ""}
                disabled={disabled || loading}
                onChange={(e) =>
                    onChange(e.target.value || undefined)
                }
            >
                <option value="">
                    {loading ? "Loading..." : `All ${label}`}
                </option>

                {(options || []).map((opt, index) => {
                    const name =
                        typeof opt === "string"
                            ? opt
                            : opt.name;

                    const count =
                        typeof opt === "string"
                            ? null
                            : opt.count;

                    return (
                        <option
                            key={index}
                            value={name}
                        >
                            {name}
                            {count !== null
                                ? ` (${count})`
                                : ""}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default FilterDropdown;