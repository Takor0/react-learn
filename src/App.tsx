// src/App.tsx
import React, { useState } from 'react';
import './styles/App.scss';
import TodoList from './components/TodoList';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = { id: Date.now(), text: input, completed: false };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
        todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
      <div className="app">
        <h1>Todo List</h1>
        <div className="todo-input">
          <input
              type="text"
              placeholder="Add new todo..."
              value={input}
              onChange={e => setInput(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
  );
};

export default App;
