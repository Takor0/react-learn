import React from "react";

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
    <table>
      <thead>
        {columns.map((column, index) => (
          <th key={column}>
            {overrideHeader?.[column]
              ? overrideHeader?.[column](index)
              : column}
          </th>
        ))}
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column}>
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
