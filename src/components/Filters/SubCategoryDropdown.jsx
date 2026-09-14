import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const SubCategoryDropdown = () => {
  const dispatch = useAppDispatch();

  const { options, selected } =
    useAppSelector((s) => s.filters);

  const categories = options?.categories || [];

  const currentCategory = categories.find(
    (c) => c.category === selected.CategoryKey
  );

  const subCategories =
    currentCategory?.subCategories || [];

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
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const filteredSubCategories =
    subCategories.filter((subCategory) =>
      subCategory.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase())
    );

  const selectedSubCategory =
    subCategories.find(
      (subCategory) =>
        subCategory.name === selected.CategorySubKey
    );

  const handleOpen = () => {
    if (!selected.CategoryKey) return;

    setOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChange = (value) => {
    dispatch(
      setFilterField({
        field: "CategorySubKey",
        value,
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
        Sub Category
      </label>

      <div
        className="form-control form-control-sm d-flex align-items-center"
        style={{
          height: "40px",
          fontSize: "14px",
          cursor: !selected.CategoryKey
            ? "not-allowed"
            : "text",
          backgroundColor: !selected.CategoryKey
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
              : selectedSubCategory?.name || ""
          }
          placeholder="All Sub Categories"
          disabled={!selected.CategoryKey}
          onChange={(e) => {
            setSearchText(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (selected.CategoryKey) {
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

      {open && selected.CategoryKey && (
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
            All Sub Categories
          </div>

          {filteredSubCategories.length > 0 ? (
            filteredSubCategories.map((subCategory) => (
              <div
                key={subCategory.name}
                onClick={() =>
                  handleChange(subCategory.name)
                }
                style={{
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "8px 12px",
                  backgroundColor:
                    subCategory.name ===
                    selected.CategorySubKey
                      ? "#f1f3f5"
                      : "white",
                }}
              >
                {subCategory.name} (
                {subCategory.count}
                )
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

export default SubCategoryDropdown;