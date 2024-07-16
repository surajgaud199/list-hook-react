import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './Component/TodoList';
import TodoForm from './Component/TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Load todos from localStorage
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    } else {
      // Fetch initial todos from an API
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(response => {
          setTodos(response.data);
          localStorage.setItem('todos', JSON.stringify(response.data));
        })
        .catch(error => console.error('Error fetching data: ', error));
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} />
    </div>
  );
};

export default App;
