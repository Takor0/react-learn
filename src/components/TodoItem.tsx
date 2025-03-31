// src/components/TodoItem.tsx
import React, { useState } from "react";
import { Todo } from "./CTodo";
import "../styles/TodoItem.scss";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.text);

  const handleSave = () => {
    updateTodo(todo.id, editingText);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
