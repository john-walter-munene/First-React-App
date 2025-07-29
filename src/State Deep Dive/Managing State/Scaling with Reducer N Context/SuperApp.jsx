import { AddTask } from "./UpdatedAddTask";
import { TaskList } from "./UpdatedTaskList";
import { TaskProvider } from "./SuperAppContext";

function TaskApp() {
    return (
        <TaskProvider>
            <h1>Day off in Kimunye</h1>
            <AddTask />
            <TaskList />
        </TaskProvider>
    );
}

export { TaskApp };