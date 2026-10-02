import { useEffect, useRef, useState } from "react";

const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
  loading,
  disabled,
  multiple = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
        setSearchText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Normalize backend options
  const normalizedOptions = (options || []).map((opt) => ({
    name:
      typeof opt === "string"
        ? opt
        : opt?.name || "",
    count:
      typeof opt === "string"
        ? null
        : opt?.count ?? null,
  }));

  // Search
  const filteredOptions = normalizedOptions.filter((option) =>
    option.name
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // Multiple selected values
  const selectedValues = multiple
    ? Array.isArray(value)
      ? value
      : []
    : [];

  const handleOpen = () => {
    if (disabled || loading) return;

    setOpen(true);
    setSearchText("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSelect = (name) => {
    if (!multiple) {
      onChange(name || undefined);
      setOpen(false);
      setSearchText("");
      return;
    }

    const currentValues = Array.isArray(value)
      ? value
      : [];

    let newValues;

    if (currentValues.includes(name)) {
      // Remove if already selected
      newValues = currentValues.filter(
        (item) => item !== name
      );
    } else {
      // Add new location
      newValues = [
        ...currentValues,
        name,
      ];
    }

    onChange(newValues);

    // IMPORTANT:
    // Keep dropdown open for multiple selection
    setOpen(true);
    setSearchText("");
  };

  const handleClearAll = () => {
    if (multiple) {
      onChange([]);
    } else {
      onChange(undefined);
    }

    setSearchText("");
  };

  const displayValue = multiple
    ? selectedValues.length === 0
      ? ""
      : selectedValues.join(", ")
    : value || "";

  return (
    <div
      ref={dropdownRef}
      className="position-relative"
    >
      <label
        className="form-label mb-1"
        style={{
          textTransform: "none",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        {label}
      </label>

      {/* Search / Selected values box */}
      <div
        className="form-control form-control-sm d-flex align-items-center"
        onClick={handleOpen}
        style={{
          height: "40px",
          fontSize: "14px",
          cursor:
            disabled || loading
              ? "not-allowed"
              : "text",
          backgroundColor:
            disabled || loading
              ? "#e9ecef"
              : "#fff",
          overflow: "hidden",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={open ? searchText : displayValue}
          placeholder={
            loading
              ? "Loading..."
              : `All ${label}`
          }
          disabled={disabled || loading}
          onChange={(e) => {
            setSearchText(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (!disabled && !loading) {
              setOpen(true);
            }
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "14px",
            background: "transparent",
            minWidth: 0,
          }}
        />

        <span
          style={{
            fontSize: "12px",
            marginLeft: "5px",
          }}
        >
          ▼
        </span>
      </div>

      {/* Dropdown */}
      {open && !disabled && !loading && (
        <div
          className="position-absolute bg-white border rounded shadow-sm w-100"
          style={{
            zIndex: 1050,
            maxHeight: "300px",
            overflowY: "auto",
            top: "100%",
            left: 0,
          }}
        >

          {/* Clear / All */}
          <div
            className="px-3 py-2"
            onClick={handleClearAll}
            style={{
              cursor: "pointer",
              fontSize: "14px",
              borderBottom: "1px solid #eee",
              fontWeight: "500",
            }}
          >
            All {label}
          </div>

          {/* Options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = multiple
                ? selectedValues.includes(option.name)
                : option.name === value;

              return (
                <div
                  key={`${option.name}-${index}`}
                  className="px-3 py-2 d-flex align-items-center"
                  onClick={() =>
                    handleSelect(option.name)
                  }
                  style={{
                    cursor: "pointer",
                    fontSize: "14px",
                    backgroundColor: isSelected
                      ? "#e9f2ff"
                      : "white",
                  }}
                >
                  {/* Checkbox for multiple */}
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      style={{
                        marginRight: "8px",
                      }}
                    />
                  )}

                  <span>
                    {option.name}

                    {option.count !== null &&
                      ` (${option.count})`}
                  </span>
                </div>
              );
            })
          ) : (
            <div
              className="px-3 py-2 text-muted"
              style={{
                fontSize: "14px",
              }}
            >
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;