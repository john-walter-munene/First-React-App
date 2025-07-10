## 🔄 The Problem with Nested State in React

When you store deeply nested objects or arrays in a single state object (e.g., something like: `projectState = { title, owner, tasks: [{...}, {...}], metadata: { ... } }`), updating a nested item becomes complex, because:

- You must shallow copy every level of the object to preserve immutability (so React can detect the change). It becomes harder to isolate updates (e.g., only update `tasks[1].status`).

## ✅ Better Strategy: Flatten State
Instead of nesting everything in one object, it’s often cleaner and more scalable to split state into smaller parts:
```
const [title, setTitle] = useState("My Project");
const [owner, setOwner] = useState("John");
const [tasks, setTasks] = useState([
  { id: 1, name: "Task A", done: false },
  { id: 2, name: "Task B", done: true },
]);
```

Then, "renest" these pieces in the render like
```
const project = {
  title,
  owner,
  tasks
};

<ProjectView project={project} />
```

This works because:

-  is the result of computation — you're right.

- You compute the shape of the nested object at render time instead of keeping it nested in state.

## 🔧 When to Keep It Nested?
f you're working with a form where data naturally belongs together (e.g. a complex object you're editing), and you're editing the whole object at once, you can use a nested state object. Just know you'll need to spread carefully:

```
setProject(prev => ({
  ...prev,
  metadata: {
    ...prev.metadata,
    newKey: "newValue"
  }
}));
```

But for scalability and easier updates, splitting is usually cleaner.