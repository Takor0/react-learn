// src/App.tsx
import React, { useState, useMemo, useEffect } from "react";
import "../styles/Todo.scss";
import CTodoList from "../components/CTodoList";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const VTodo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [shouldJump, setShouldJump] = useState(false);

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = { id: Date.now(), text: input, completed: false };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const memoListCount = useMemo(() => {
    return todos.length;
  }, [todos]);

  useEffect(() => {
    setShouldJump(true);
    const timeoutId = setTimeout(() => {
      setShouldJump(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [memoListCount]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  };

  return (
    <div>
      <h1>
        Todo List
        <span className="counter-container">
          (
          <span className={shouldJump ? "counter-jump" : ""}>
            {memoListCount}
          </span>
          )
        </span>
      </h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <CTodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default VTodo;
