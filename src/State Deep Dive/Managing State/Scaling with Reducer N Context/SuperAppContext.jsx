import { createContext, useReducer, useContext } from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

function TaskProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext value={tasks}>
            <TasksDispatchContext value={dispatch}>
                {children}
            </TasksDispatchContext>
        </TasksContext>
    );
}

function tasksReducer(tasks, action) {
     switch (action.type) {
    case 'added': {
      return [...tasks, { id: action.id, text: action.text, done: false }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) return action.task;
          return t;
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];

export { TaskProvider, TasksContext, TasksDispatchContext };

// You can also export functions that use the context from TasksContext.js:
function useTasks() {
  return useContext(TasksContext);
}

function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

// When a component needs to read context, it can do it through these functions:


function TestComponent() {
    const tasks = useTasks();
    const dispatch = useTasksDispatch();

    // Doesn't change behavior
    // Let's you split these contexts further or add logic to these functions.

    return <p> A test component to show Current info: Tasks: ({tasks}), Dispatch ({dispatch})</p>
}

export { TestComponent };  

// Recap
// You can combine reducer with context to let any component read and update state above it.

// To provide state and the dispatch function to components below:
// 1. Create two contexts (for state and for dispatch functions).
// 2. Provide both contexts from the component that uses the reducer.
// 3. Use either context from components that need to read them.

// You can further declutter the components by moving all wiring into one file.
// 1. You can export a component like TasksProvider that provides context.
// 2. You can also export custom Hooks like useTasks and useTasksDispatch to read it.
// You can have many context-reducer pairs like this in your app.