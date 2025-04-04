// src/components/TodoList.tsx
import React from "react";
import { Todo } from "../views/VTodo";
import CTodoItem from "./CTodoItem";
import "../styles/TodoList.scss";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
}

const CTodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <CTodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};

export default CTodoList;
