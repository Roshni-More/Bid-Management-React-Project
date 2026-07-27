// import React from "react";

const Table = ({ columns, data, rowKey, sortBy, descending, onSortChange }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className={`text-uppercase small text-muted ${col.className || ""}`}
                style={col.sortKey ? { cursor: "pointer" } : undefined}
                onClick={() => col.sortKey && onSortChange?.(col.sortKey)}
              >
                {col.header}
                {col.sortKey && sortBy === col.sortKey && (descending ? " ▼" : " ▲")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td key={col.header} className={col.className}>
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