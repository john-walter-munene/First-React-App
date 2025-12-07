import { Component } from "react";
import { React } from 'react';
import { useState } from "react";

// A funcational component.
const FunctionalInput = ({ name }) => {
    const [todos, setTodos] = useState(["Just some demo tasks", "As an example"]);
    const [inputVal, setInputVal] = useState("");

    const handleInputChange = (e) => {
        setInputVal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos((prevTodos) => [...prevTodos, inputVal]);
        setInputVal("");
    };

    return (
        <section>
            <h3>{name}</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task-entry">Enter a task: </label>
                <input type="text" id="task-entry" name="task-entry" value={inputVal} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            <h4>All the tasks!</h4>
            <ul>{todos.map((todo) => (<li key={todo}>{todo}</li>))}</ul>
        </section>
    );
};

export default FunctionalInput;

// Recreating the above component as a class.
class ClasInput extends Component {
    // Some code goes here...
}

// This can also be written as
class ClasInputTwo extends React.Component {}
// instead of destructuring the `Component` during import

// Use of constructor and props
class ClasInputThree extends Component {
    constructor (props) {
        super(props);
    }
    // Some more code here
}

class ClasInputFour extends Component {
    constructor(props) {
        super(props);
    }
    // Some code here

     render() {
        const { name } = this.props;
        return <div>{name}</div>;
    }
}

export { ClasInput, ClasInputTwo, ClasInputThree, ClasInputFour };

// Above example in full class.

class ClassInputFive extends Component {
  constructor(props) {
    super(props);

    this.state = { todos: [], inputVal: "", };
  }

  // Some more code goes here

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
       {/* The input field to enter Todos */}
        <form>
          <label htmlFor="task-entry">Enter a task: </label>
          <input type="text" id="task-entry" name="task-entry" />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the Todos, displayed */}
        <ul></ul>
      </section>
    );
  }
}

export { ClassInputFive };

// How to use state and manage context
class ClasInputFive extends Component {
    constructor(props) {
        super(props);

        this.state = { todos: [], inputVal: "" };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState((state) => ({...state, inputVal: event.target.value }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState((state) => ({
            // todos: [...state.todos, state.inputVal ], alternative version
            todos: state.todos.concat(state.inputVal),
            inputVal: ""
        }));
    }

    // Some more code here.
    render() {
        const { name } = this.props;

        return (
            <section>
                <h3>{name}</h3>

                <form action="post" onSubmit={this.handleSubmit}>
                    <label htmlFor="task-entry">Enter a task: </label>
                    <input type="text" id="task-entry" name="task-entry" 
                        value={this.state.inputVal} onChange={this.handleInputChange} />
                    <button type="submit" >Submit</button>
                </form>

                <h4>All the tasks</h4>
                <ul>{this.state.todos.map((todo) => (<li key={todo}>{todo}</li>))}</ul>
            </section>
        );
    }
}

export { ClasInputFive };