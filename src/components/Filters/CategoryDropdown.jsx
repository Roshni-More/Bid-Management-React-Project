import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";
import { loadFilterOptions } from "../../features/filters/filterThunk";

const CategoryDropdown = () => {
  const dispatch = useAppDispatch();

  const { options, optionsLoading, selected } =
    useAppSelector((s) => s.filters);

  const categories = options?.categories || [];

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

  const filteredCategories = categories.filter((category) =>
    category.category
      ?.toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const selectedCategory = categories.find(
    (category) =>
      category.category === selected.CategoryKey
  );

  const handleOpen = () => {
    if (optionsLoading) return;

    setOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChange = (value) => {
    dispatch(
      setFilterField({
        field: "CategoryKey",
        value,
      })
    );

    dispatch(
      loadFilterOptions({
        CategoryKey: value,
      })
    );

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
        Category
      </label>

      <div
        className="form-control form-control-sm d-flex align-items-center"
        style={{
          height: "40px",
          fontSize: "14px",
          cursor: optionsLoading
            ? "not-allowed"
            : "text",
          backgroundColor: optionsLoading
            ? "#e9ecef"
            : "#fff",
        }}
        onClick={handleOpen}
      >
        <input
          ref={inputRef}
          type="text"
          value={
            open
              ? searchText
              : selectedCategory?.category || ""
          }
          placeholder={
            optionsLoading
              ? "Loading..."
              : "All Categories"
          }
          disabled={optionsLoading}
          onChange={(e) => {
            setSearchText(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (!optionsLoading) {
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

        <span style={{ fontSize: "12px" }}>
          ▼
        </span>
      </div>

      {open && !optionsLoading && (
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
          <div
            className="px-3 py-2"
            onClick={() => handleChange(undefined)}
            style={{
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            All Categories
          </div>

          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category.category}
                onClick={() =>
                  handleChange(category.category)
                }
                style={{
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "8px 12px",
                  backgroundColor:
                    category.category ===
                    selected.CategoryKey
                      ? "#f1f3f5"
                      : "white",
                }}
              >
                {category.category} ({category.count})
              </div>
            ))
          ) : (
            <div
              className="px-3 py-2 text-muted"
              style={{ fontSize: "14px" }}
            >
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;