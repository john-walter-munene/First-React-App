import { Component } from "react";

class ClassInput extends Component {
    constructor(props) {
        super(props);
        // Component specific changing data (states).
        this.state = { todos: ['Just some demo tasks', 'As an example'], inputVal: '', indexOfArticleOnEdit: null, };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdatesForArticleOnEdit = this.handleUpdatesForArticleOnEdit.bind(this);
    }

    handleInputChange(e) {
        this.setState({ inputVal: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState(state => ({ todos: state.todos.concat(state.inputVal), inputVal: '', }));
    }

    handleDelete(index) {
        const updatedCopyOfTodos = this.state.todos.filter((_, i) => i !== index);
        this.setState({ todos: updatedCopyOfTodos });
    }

    handleUpdatesForArticleOnEdit(index) {
        this.setState({ indexOfArticleOnEdit: index });
    }

    render() {
        const buttonStyles = { marginLeft: '10px' };

        return (
            <section>
                <h3>{this.props.name}</h3>
                <Count todoCount={this.state.todos.length} />

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="task-entry">Enter a task: </label>
                    <input type="text" name="task-entry" value={this.state.inputVal} 
                        onChange={this.handleInputChange} />
                    <button type="submit">Submit</button>
                </form>

                <h4>All the tasks!</h4>
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li style={{ marginBottom: '10px' }} key={index}>
                            {index !== this.state.indexOfArticleOnEdit ? todo : ''}
                            <button style={buttonStyles} onClick={() => this.handleDelete(index)}>Delete</button>
                            <EditButton state={this.state} onStateChange={updater => this.setState(updater)}
                                index={index} onArticleOnEditChange={this.handleUpdatesForArticleOnEdit} style={buttonStyles} />
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
        this.state = { mode: false };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleToggle() {
    const { mode } = this.state;
    this.props.onArticleOnEditChange(mode ? null : this.props.index);
    this.setState({ mode: !mode });
}


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
        const { mode } = this.state;
        const { state, index, style } = this.props;
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

export { ClassInput, ClassInputWithArrowFunctions };