import { useState } from "react";

// React Component Composition

const UsernameForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');

    return (
        <Form onSubmit={event => { onSubmit(username); event.preventDefault(); }}>
            <InputField value={username} onChange={setUsername}>
                Your name:
            </InputField>
            
            <Button type="submit">Send</Button>
        </Form>
    );
};

const Form = ({ onSubmit, children }) => (<form onSubmit={onSubmit}>{children}</form>);

const Button = ({ onClick, type = 'button', children }) => 
    (<button type={type} onClick={onClick}>{children}</button>);

const InputField = ({ value, onChange, children }) => 
    (<label>{children}<input type="text" value={value} onChange={event => onChange(event.target.value)}/></label>);

export { UsernameForm };

// We have a specialized Form component (UsernameForm)
// The Form component can also be used in other components

const App = () => {
    const onSubmit = username => console.log(username);

    const [username, setUsername] = useState('');

    return (
        <Form onSubmit={event => { onSubmit(username); event.preventDefault(); }}>
            <InputField value={username} onChange={setUsername}>
                Your name:
            </InputField>

            <Button type="submit">Send</Button>
        </Form>
    );
};

export { App };

// Fine-grained Props Control

// If you would want to add more props to the Button component
// you can do so without bothering the other components in the component composition of the Form component

const AppTwo = () => {
    const onSubmit = username => console.log(username);

    const [username, setUsername] = useState('');

    return (
        <Form onSubmit={event => { onSubmit(username); event.preventDefault(); }}>
            <InputField value={username} onChange={setUsername}>
                Your name:
            </InputField>

            <ButtonTwo color="violet" type="submit">Send</ButtonTwo>
        </Form>
    );
};

const ButtonTwo = ({ color = 'white', onClick, type = 'button', children, }) => 
    (<button style={{ backgroundColor: color }} type={type} onClick={onClick}>{children}</button>);

export { AppTwo };

// React Component Composition by Example
// Often best for doing application layouts.
const SplitPane = ({ left, right }) => (
  <div>
    <div className="left-pane">{left}</div>
    <div className="right-pane">{right}</div>
  </div>
);

// and then it could be used like
const AppThree = () => {
    return (
        <SplitPane
            left={
                <div>
                    <ul>
                        <li><a href="#">Link 1</a></li>
                        <li><a href="#">Link 2</a></li>
                    </ul>
                </div>}
            right={<Copyright label="Robin" />}/>
    );  
}