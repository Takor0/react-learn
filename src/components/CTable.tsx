import React, { useEffect, useMemo, useState } from "react";
import "../styles/CTable.scss";
import { type } from "node:os";
import CInput from "./CInput"; // Import the SCSS styles

export type TableData = Record<string, string | number>;

type ColumnRenderer = (column: string, row: TableData) => React.ReactNode;

interface Column {
  name: string;
  renderer?: ColumnRenderer;
  label?: string;
  type?: string;
  selectOptions?: string[];
  filterable?: boolean;
  sortable?: boolean;
}

interface CTableProps {
  columns: string[] | Column[];
  data: TableData[];
  columnRenderers?: Record<string, ColumnRenderer>;
  children?: React.ReactNode;
}

interface ColumnHeaderProps {
  children: (index: number) => React.ReactNode;
  name: string;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = () => {
  return null;
};

const CTable: React.FC<CTableProps> = ({
  columns,
  data,
  columnRenderers,
  children,
}) => {
  const overrideHeader: Record<string, (index: number) => React.ReactNode> = {};
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === ColumnHeader) {
      const { name, children: colChild } = child.props as ColumnHeaderProps;
      overrideHeader[name] = colChild;
    }
  });

  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (column: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  const computedColumns: Column[] = useMemo(() => {
    return columns.map((col) =>
      typeof col === "string" ? { name: col } : col,
    );
  }, [columns]);

  const filteredData: TableData[] = useMemo(() => {
    return data.filter((row) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        if (!filterValue) return true;
        const cellValue = row[key];
        return String(cellValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      });
    });
  }, [data, filters]);

  return (
    <table className="ctable">
      <thead className="ctable__header">
        <tr>
          {computedColumns.map((column, index) => (
            <th key={column.name} className="ctable__header-cell">
              {overrideHeader?.[column.name]
                ? overrideHeader[column.name](index)
                : column.name}
            </th>
          ))}
        </tr>
        <tr>
          {computedColumns.map((column) => (
            <th key={column.name} className="ctable__header-cell">
              <CInput
                onChange={(v) =>
                  handleFilterChange(column.name, v.target.value)
                }
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="ctable__body">
        {filteredData.map((row, rowIndex) => (
          <tr key={rowIndex} className="ctable__row">
            {computedColumns.map((column) => (
              <td key={column.name} className="ctable__cell">
                {columnRenderers && columnRenderers[column.name]
                  ? columnRenderers[column.name](column.name, row)
                  : row[column.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CTable;
