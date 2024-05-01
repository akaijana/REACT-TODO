
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { Todo } from './Todo';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // ADD A TODO LIST
  const addTask = (task) => {
    if (!task.text) {
      return; // Don't add empty tasks
    }
    const newTodos = [task, ...todos];
    setTodos(newTodos);
    // Save updated todos to local storage
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const removeTask = (id) => {
    const updatedTasks = todos.filter((task) => task.id !== id);
    setTodos(updatedTasks);
    // Save updated todos to local storage
    localStorage.setItem('todos', JSON.stringify(updatedTasks));
  };

  const completeTask = (id) => {
    const updatedTasks = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = true;
      }
      return todo;
    });
    setTodos(updatedTasks);
    // Save updated todos to local storage
    localStorage.setItem('todos', JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <TodoForm addTask={addTask} />
      <Todo todos={todos} completeTask={completeTask} removeTask={removeTask} />
    </div>
  );
}
