// Here is how you can combine a reducer with context:

// 1. Create the context.
// 2. Put state and dispatch into context.
// 3. Use context anywhere in the tree.

// Remodelling ReucedApp.jsx

// Step 1: Create the context
// const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
// To pass them down the tree, you will create two separate contexts:

// TasksContext provides the current list of tasks.
// TasksDispatchContext provides the function that lets components dispatch actions.


// Step 2: Put state and dispatch into context
import { useReducer } from "react";
import { TasksContext, TasksDispatchContext } from "./TasksContext";

function TaskApp() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleAddTask(text) {
    dispatch({ type: 'added', id: nextId++, text: text, });
  }

  function handleChangeTask(task) {
    dispatch({ type: 'changed', task: task });
  }

  function handleDeleteTask(taskId) {
    dispatch({ type: 'deleted', id: taskId });
  }

  typeof handleAddTask, typeof handleChangeTask, typeof handleDeleteTask;

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        ...
      </TasksDispatchContext>
    </TasksContext>
  );
}

export { TaskApp };

// Step 3: Use context anywhere in the tree 
// Remove prop passing

// Now you don’t need to pass the list of tasks or the event handlers down the tree:
<TasksContext value={tasks}>
  <TasksDispatchContext value={dispatch}>
    <h1>Day off in Kyoto</h1>
    <AddTask />
    <TaskList />
  </TasksDispatchContext>
</TasksContext>

// Instead, any component that needs the task list can read it from the TasksContext:
export default function TaskList() {
  const tasks = useContext(TasksContext);
  // .
}

// To update the task list, any component can read the dispatch function from context and call it:
export function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  // ...
  return (
    // ...
    <button onClick={() => {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }}>Add</button>
    // ...
)}

// Final solution in UpdatedApp.jsx