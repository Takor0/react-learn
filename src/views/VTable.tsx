import React from "react";
import CTable, { ColumnHeader, TableData } from "../components/CTable";

export const VTable: React.FC = () => {
  const columns: string[] = ["name", "age", "location"];
  const data: TableData[] = [
    {
      name: "tom",
      age: 25,
      location: "Budapest",
    },
    {
      name: "tom",
      age: 234,
      location: "Budapest",
    },
  ];

  return (
    <CTable
      columns={columns}
      data={data}
      columnRenderers={{
        age: (column: string, row: TableData) => {
          return <span>{row[column]} GIIIT</span>;
        },
      }}
    >
      <ColumnHeader name="location">
        {(index) => <span> {index} </span>}
      </ColumnHeader>
    </CTable>
  );
};
