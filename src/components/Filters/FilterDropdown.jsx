import { useEffect, useRef, useState } from "react";

const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
  loading,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
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

  // Convert options to a common format
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

  // Filter options according to typed text
  const filteredOptions = normalizedOptions.filter((option) =>
    option.name
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const selectedOption = normalizedOptions.find(
    (option) => option.name === value
  );

  const handleOpen = () => {
    if (disabled || loading) return;

    setOpen(true);
    setSearchText("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSelect = (name) => {
    onChange(name || undefined);
    setOpen(false);
    setSearchText("");
  };

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

      {/* Main searchable input */}
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
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={
            open
              ? searchText
              : selectedOption?.name || ""
          }
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
          }}
        />

        {/* Dropdown arrow */}
        <span
          style={{
            fontSize: "12px",
            marginLeft: "5px",
          }}
        >
          ▼
        </span>
      </div>

      {/* Dropdown options */}
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
          {/* All option */}
          <div
            className="px-3 py-2"
            onClick={() => handleSelect("")}
            style={{
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            All {label}
          </div>

          {/* Filtered options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={`${option.name}-${index}`}
                className="px-3 py-2"
                onClick={() =>
                  handleSelect(option.name)
                }
                style={{
                  cursor: "pointer",
                  fontSize: "14px",
                  backgroundColor:
                    option.name === value
                      ? "#f1f3f5"
                      : "white",
                }}
              >
                {option.name}

                {option.count !== null &&
                  ` (${option.count})`}
              </div>
            ))
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