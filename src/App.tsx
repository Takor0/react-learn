import React, { useState, useMemo, useEffect } from "react";
import VTodo from "./views/VTodo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { VTable } from "./views/VTable";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <div className="sidebar__container">
          <nav className="sidebar">
            <Link to="/todo">Todo</Link>
            <Link to="/table">Table</Link>
          </nav>
        </div>
        <Routes>
          <Route path={"/todo"} element={<VTodo />} />
          <Route path={"/table"} element={<VTable />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
