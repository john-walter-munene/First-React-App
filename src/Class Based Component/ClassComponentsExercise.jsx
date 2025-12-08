import { Component } from "react";

class ClassInput extends Component {
    constructor(props) {
        super(props);
        // Component specific changing data (states).
        this.state = { todos: ['Just some demo tasks', 'As an example'], inputVal: '', indexOfTodoOnEdit: null, };

        // Reconciling the context of this in class methods.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdatesForTodOnEdit = this.handleUpdatesForTodOnEdit.bind(this);
    }

    // Update form to collect next todo item.
    handleInputChange(event) {
        this.setState({ inputVal: event.target.value });
    }

    // Save a todo item in the list.
    handleSubmit(event) {
        event.preventDefault();
        this.setState(state => ({ todos: state.todos.concat(state.inputVal), inputVal: '', }));
    }

    // Delete a todo item by index (workable for now as there's no unique IDs in this app).
    handleDelete(index) {
        const updatedCopyOfTodos = this.state.todos.filter((_, i) => i !== index);
        this.setState({ todos: updatedCopyOfTodos });
    }

    // Track the to do itme to be edited.
    handleUpdatesForTodOnEdit(index) {
        this.setState({ indexOfTodoOnEdit: index });
    }

    render() {
        const buttonStyles = { marginLeft: '10px' };

        return (
            <section>
                <h3>{this.props.name}'s Todo list</h3>
                <Count todoCount={this.state.todos.length} />

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="task-entry">Enter a task: </label>
                    <input type="text" name="task-entry" value={this.state.inputVal} onChange={this.handleInputChange} />
                    <button type="submit">Submit</button>
                </form>

                <h4>All the tasks!</h4>
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li style={{ marginBottom: '10px' }} key={index}>
                            {index !== this.state.indexOfTodoOnEdit ? todo : ''}
                            <button style={buttonStyles} onClick={() => this.handleDelete(index)}>Delete</button>
                            <EditButton mode={index === this.state.indexOfTodoOnEdit} state={this.state} index={index} style={buttonStyles}
                                onStateChange={updater => this.setState(updater)} onTodoOnEditChange={this.handleUpdatesForTodOnEdit}  />
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

class EditButton extends Component {
    constructor(props) {
        super(props);
        // Internal child state for determining component mode: view/edit

        // Reconciling the context of this in class methods.
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    // Switch between view and edit modes. 
    // Update parent on a to in edit to not display it twice.
    handleToggle() {
        const { mode } = this.props;
        this.props.onTodoOnEditChange(mode ? null : this.props.index);
    }

    // Edit a to item.
    handleEdit(event) {
        const newValue = event.target.value;
        const itemIndex = this.props.index;

        this.props.onStateChange(prevState => {
            const copyOfTodoItems = [...prevState.todos];
            copyOfTodoItems[itemIndex] = newValue;
            return { ...prevState, todos: copyOfTodoItems };
        });
    }

    render() {
        const { mode, state, index, style } = this.props;
        const currentValue = state.todos[index];

        return (
            <>
                {mode && (<input type="text" value={currentValue} style={style} onChange={(event) => this.handleEdit(event)}/>)}
                <button style={style} onClick={this.handleToggle}>{mode ? 'Submit' : 'Edit'}</button>
            </>
        );
    }
}

class Count extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { todoCount } = this.props;
        return  (<h3>{todoCount} Items in your todo list</h3>);
    }
}

export { ClassInput };

class ClassInputWithArrowFunctions extends Component {
    state = {
        todos: ["Just some demo tasks", "As an example"],
        inputVal: "",
    };

    // Arrow functions automatically bind `this`
    handleInputChange = (e) => {
        this.setState({ inputVal: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState((state) => ({ todos: [...state.todos, state.inputVal], inputVal: "", }));
    };

  handleDelete = (index) => {
    this.setState((state) => ({ todos: state.todos.filter((_, i) => i !== index),}));
  };

    render() {
        const { todos, inputVal } = this.state;
        const { name } = this.props;

        const buttonStyles = { marginLeft: "10px" };

        return (
        <section>
            <h3>{name}</h3>

            <form onSubmit={this.handleSubmit}>
                <label htmlFor="task-entry">Enter a task: </label>
                <input type="text" name="task-entry" value={inputVal} onChange={this.handleInputChange} />
                <button type="submit">Submit</button>
            </form>

            <h4>All the tasks!</h4>
            <ul>
            {todos.map((todo, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                    {todo}
                    <button style={buttonStyles} onClick={() => this.handleDelete(index)}>Delete</button>
                </li>
            ))}
            </ul>
        </section>
        );
    }
}

export { ClassInputWithArrowFunctions };