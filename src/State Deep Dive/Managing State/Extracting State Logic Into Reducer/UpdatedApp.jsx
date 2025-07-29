import { useReducer } from 'react';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({ type: 'added', id: nextId++, text: text, });
  }

  function handleChangeTask(task) {
    dispatch({ type: 'changed', task: task, });
  }

  function handleDeleteTask(taskId) {
    dispatch({ type: 'deleted', id: taskId, });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, { id: action.id, text: action.text, done: false, },];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) return action.task;
        return t;
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];

// Writing Reducers Well.
// Reducers must be pure. (similar to state updater functions)
// Each action describes a single user interaction, even if that leads to multiple changes in the data. 

// Writing concise reducers with Immer 

// Summary
// To convert from useState to useReducer:
// Dispatch actions from event handlers.
// Write a reducer function that returns the next state for a given state and action.
// Replace useState with useReducer.
// Reducers require you to write a bit more code, but they help with debugging and testing.
// Reducers must be pure.
// Each action describes a single user interaction.
// Use Immer if you want to write reducers in a mutating style.