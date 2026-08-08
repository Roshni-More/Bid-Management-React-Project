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
                Sub Category
            </label>

            <select
                className="form-select form-select-sm"
                value={selected.CategorySubKey || ""}
                disabled={!selected.CategoryKey}
                onChange={(e) =>
                    dispatch(
                        setFilterField({
                            field: "CategorySubKey",
                            value: e.target.value || undefined
                        })
                    )
                }
            >
                <option value="">
                    All Sub Categories
                </option>

                {subCategories.map((sc) => (
                    <option
                        key={sc.name}
                        value={sc.name}
                    >
                        {sc.name} ({sc.count})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SubCategoryDropdown;