// import React from "react";

const Table = ({ columns, data, rowKey, sortBy, descending, onSortChange }) => {
  return (
    <div className="table-responsive">
      <table
        className="table table-hover align-middle mb-0"
        style={{
          fontSize: "14px",
          width: "100%",
        }}
      >
        <thead className="table-light">
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className={`text-uppercase text-muted ${col.className || ""}`}
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "10px 12px",
                  whiteSpace: "nowrap",
                  ...(col.sortKey ? { cursor: "pointer" } : {}),
                }}
                onClick={() => col.sortKey && onSortChange?.(col.sortKey)}
              >
                {col.header}

                {col.sortKey &&
                  sortBy === col.sortKey &&
                  (descending ? " ▼" : " ▲")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td
                  key={col.header}
                  className={col.className}
                  style={{
                    fontSize: "12px",
                    padding: "10px 10px",
                    lineHeight: "1.4",
                    verticalAlign: "middle",
                  }}
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
