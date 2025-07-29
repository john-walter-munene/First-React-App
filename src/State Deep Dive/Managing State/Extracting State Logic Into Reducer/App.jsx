import { useState } from 'react';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
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

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];

// Writing a Reducers
// 1. Move from setting state to dispatching actions.
// 2. Write a reducer function.
// 3. Use the reducer from your component.

// Step 1: Move from setting state to dispatching actions 
function updatedhandleAddTask(text) {
//  console.log(`Adding new task: "${text}"`);

 dispatch({ type: 'added', id: nextId++, text });
}


function updatedhandleChangeTask(task) {
    // console.log(`Updating task ${task.id} "${task}"`);
    dispatch({ type: 'changed', task });
}

function updatedhandleDeleteTask(taskID) {
    // console.log(`Deleteing task ${taskID} "${initialTasks[taskID]}"`);
    dispatch({ type: 'deleted', id: taskID} /*"action" object:*/);
}

typeof updatedhandleAddTask; typeof updatedhandleChangeTask; typeof updatedhandleDeleteTask // Clear console errors

// Note
// dispatch({
//   // specific to component
//   type: 'what_happened',
//   // other fields go here
// });

// Step 2: Write a reducer function
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [
      ...tasks,
      {
        id: action.id,
        text: action.text,
        done: false,
      },
    ];
  } else if (action.type === 'changed') {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error('Unknown action: ' + action.type);
  }
}

typeof tasksReducer; typeof tasksReducerTwo

// Its a convention to use switch statements in reducers as they are easier to read.
function tasksReducerTwo(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
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

function dispatch(object) {
    console.log(`Dispatching object to reducer: ${object}`)
}

// Step 3: Use the reducer from your component
// Finally, you need to hook up the tasksReducer to your component. Import the useReducer Hook from React:

// import { useReducer } from 'react';
// Then you can replace useState:

// const [tasks, setTasks] = useState(initialTasks);
// with useReducer like so:

// const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

// Fully fledged solution in UpdatedApp.jsx