import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>TODO List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.target.elements.todo.value.trim();
          if (text) {
            addTodo(text);
            e.target.elements.todo.value = '';
          }
        }}
      >
        <input type="text" name="todo" placeholder="Add new todo..." />
        <button type="submit">Add Todo</button>
      </form>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}
          >
            <span>{todo.text}</span>
            <div>
              <button onClick={() => completeTodo(index)}>Complete</button>
              <button onClick={() => removeTodo(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
