import React from "react";
import "../styles/CTable.scss"; // Import the SCSS styles

export type TableData = Record<string, string | number>;

type ColumnRenderer = (column: string, row: TableData) => React.ReactNode;

interface CTableProps {
  columns: string[];
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

  return (
    <table className="ctable">
      <thead className="ctable__header">
        <tr>
          {columns.map((column, index) => (
            <th key={column} className="ctable__header-cell">
              {overrideHeader?.[column]
                ? overrideHeader[column](index)
                : column}
            </th>
          ))}
        </tr>
        <tr>
          {columns.map((column) => (
            <th key={column} className="ctable__header-cell">
              {overrideHeader?.[column]
                ? overrideHeader[column](0)
                : column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="ctable__body">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="ctable__row">
            {columns.map((column) => (
              <td key={column} className="ctable__cell">
                {columnRenderers && columnRenderers[column]
                  ? columnRenderers[column](column, row)
                  : row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CTable;
