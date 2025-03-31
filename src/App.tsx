import React, { useState, useMemo, useEffect } from "react";
import CTodo from "./components/CTodo";
import CTable, { ColumnHeader } from "./components/CTable";
import { TableData } from "./components/CTable";


const App: React.FC = () => {
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
    <div className="app">
      <CTodo/>
      <CTable columns={columns} data={data} columnRenderers={
        {
          age: (column: string, row: TableData) => {
            return <span>{row[column]} GIIIT</span>;
          },
        }
      }>
        <ColumnHeader name="location">
          {(index) => <span> {index} </span>}
        </ColumnHeader>
      </CTable>
    </div>
  );
};

export default App;
