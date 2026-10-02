import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  toggleLocationFilter,
  removeLocationFilter,
  clearLocations,
} from "../../features/filters/filterSlice";

const OfficeDropdown = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { options, optionsLoading, selected } = useAppSelector(
    (s) => s.filters
  );

  const selectedLocations = selected.Locations || [];

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const locationList = (options?.locations || options?.consignees || []).map(
    (opt) => ({
      name: typeof opt === "string" ? opt : opt?.name || "",
      count: typeof opt === "string" ? null : opt?.count ?? null,
    })
  );

  const filteredOptions = locationList.filter((option) =>
    option.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOpen = () => {
    if (optionsLoading) return;
    setOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const handleSelectOption = (name) => {
    dispatch(toggleLocationFilter(name));
    setSearchText(""); // <-- Clears the typed search text immediately!
    inputRef.current?.focus(); // Keeps cursor ready for your next search
  };

  return (
    <div ref={dropdownRef} className="position-relative">
      <label
        className="form-label mb-1"
        style={{ fontSize: "12px", fontWeight: "500" }}
      >
        Location
      </label>

      {/* Input container with chips and search */}
      <div
        className="form-control form-control-sm d-flex align-items-center flex-wrap gap-1"
        onClick={handleOpen}
        style={{
          minHeight: "40px",
          height: "auto",
          fontSize: "13px",
          cursor: "pointer",
          backgroundColor: "#fff",
          padding: "4px 8px",
        }}
      >
        {selectedLocations.map((loc) => (
          <span
            key={loc}
            className="badge bg-primary d-inline-flex align-items-center gap-1 text-white"
            style={{
              fontSize: "11px",
              padding: "4px 6px",
              borderRadius: "4px",
              fontWeight: "normal",
            }}
          >
            {loc}
            <span
              role="button"
              title="Remove"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeLocationFilter(loc));
              }}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "2px",
                fontSize: "12px",
                lineHeight: "1",
              }}
            >
              ✕
            </span>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={searchText}
          placeholder={
            selectedLocations.length === 0
              ? optionsLoading
                ? "Loading..."
                : "All Location"
              : ""
          }
          onChange={(e) => {
            setSearchText(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onClick={(e) => e.stopPropagation()}
          style={{
            border: "none",
            outline: "none",
            flex: "1 1 60px",
            minWidth: "60px",
            fontSize: "13px",
            background: "transparent",
          }}
        />

        <span style={{ fontSize: "11px", color: "#6c757d", marginLeft: "auto" }}>
          ▼
        </span>
      </div>

      {/* Dropdown menu */}
      {open && !optionsLoading && (
        <div
          className="position-absolute bg-white border rounded shadow-sm w-100"
          style={{
            zIndex: 1050,
            maxHeight: "260px",
            overflowY: "auto",
            top: "100%",
            left: 0,
            marginTop: "2px",
          }}
        >
          <div
            className="px-3 py-2 text-danger border-bottom d-flex justify-content-between align-items-center"
            onClick={() => {
              dispatch(clearLocations());
              setSearchText("");
            }}
            style={{ cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
          >
            <span>All Locations (Clear selection)</span>
            {selectedLocations.length > 0 && (
              <span>({selectedLocations.length} selected)</span>
            )}
          </div>

          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => {
              const isChecked = selectedLocations.includes(opt.name);
              return (
                <div
                  key={`${opt.name}-${index}`}
                  className="px-3 py-2 d-flex align-items-center justify-content-between"
                  onClick={() => handleSelectOption(opt.name)}
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    backgroundColor: isChecked ? "#e8f0fe" : "white",
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input mt-0"
                      checked={isChecked}
                      onChange={() => {}}
                      style={{ cursor: "pointer" }}
                    />
                    <span>{opt.name}</span>
                  </div>
                  {opt.count !== null && (
                    <span className="text-muted small">({opt.count})</span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-muted small">No locations found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default OfficeDropdown;