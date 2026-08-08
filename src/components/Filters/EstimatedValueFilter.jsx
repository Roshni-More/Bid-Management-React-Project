import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setFilterField } from "../../features/filters/filterSlice";

const EstimatedValueFilter = () => {
    const dispatch = useAppDispatch();

    const minValue = useAppSelector(
        (state) => state.filters.selected.MinEstimatedValue
    );

    const maxValue = useAppSelector(
        (state) => state.filters.selected.MaxEstimatedValue
    );

    return (
        <div className="row g-1">

            {/* Min Estimated Value */}
            <div className="col-6">
                <label
                    className="form-label fw-semibold mb-1"
                    style={{ fontSize: "12px" }}
                >
                    Min Estimat
                </label>

                <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Min"
                    value={minValue || ""}
                    onChange={(e) =>
                        dispatch(
                            setFilterField({
                                field: "MinEstimatedValue",
                                value: e.target.value,
                            })
                        )
                    }
                />
            </div>

            {/* Max Estimated Value */}
            <div className="col-6">
                <label
                    className="form-label fw-semibold mb-1"
                    style={{ fontSize: "12px" }}
                >
                    Max Estimat
                </label>

                <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Max"
                    value={maxValue || ""}
                    onChange={(e) =>
                        dispatch(
                            setFilterField({
                                field: "MaxEstimatedValue",
                                value: e.target.value,
                            })
                        )
                    }
                />
            </div>

        </div>
    );
};

export default EstimatedValueFilter;