import { useState } from 'react';
import AddTodo from './AddTodo.jsx';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(title) {
    let nextTodo = {id: nextId++, title, done: false };
    let updatedTodos = [...todos, nextTodo];
    setTodos(updatedTodos);
  }

function handleChangeTodo(nextTodo) {
  const indexOfCurrentTodo = todos.findIndex(todo => todo.id === nextTodo.id);
  if (indexOfCurrentTodo === -1) return; // Optionally handle missing todo

  const newTodo = { ...nextTodo }; // or modify it as needed
  const updatedTodos = [
    ...todos.slice(0, indexOfCurrentTodo),
    newTodo,
    ...todos.slice(indexOfCurrentTodo + 1)
  ];
  setTodos(updatedTodos);
}

// Above code works as an alternative to
//  function updatedhandleChangeTodo(nextTodo) {
//     setTodos(todos.map(t => {
//       if (t.id === nextTodo.id) {
//         return nextTodo;
//       } else {
//         return t;
//       }
//     }));

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);
  }
  
  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList todos={todos} onChangeTodo={handleChangeTodo} onDeleteTodo={handleDeleteTodo} />
    </>
  );
 }

export { TaskApp }