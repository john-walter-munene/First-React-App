function Button() {
    return (<button>Click Me!</button>);
}

function ButtonTwo() {
    return (<button>Don't click me!</button>);
}

function App() {
    return (
        <div>
            <Button />
            <ButtonTwo />
            <Button />
        </div>
    );
}

export { App };

// Avoiding duplication of code as in the above setup.
function ButtonWithProps(props) {
    const buttonStye = {
        color: props.color,
        fontSize: `${props.fontSize} px`,
    };

    return (<button style={buttonStye}>{props.text}</button>);
}

function UpdatedApp() {
    return (
        <div>
            <ButtonWithProps text="Click Me!" color="blue" fontSize={12} />
            <ButtonWithProps text="Don't Click Me" color="red" fontSize={12} />
            <ButtonWithProps text="Click Me!" color="blue" fontSize={20} />
        </div>
    );
}

export { UpdatedApp };

// Prop destructuring
function ButtonThree({ text, color, fontSize}) {
    const buttonStye = {
        color: color,
        fontSize: `${fontSize}px`,
    };

    return (<button style={buttonStye}>{text}</button>);
}

function AppThree() {
    return (
        <div>
            <ButtonThree text="Click Me!" color="blue" fontSize={12} />
            <ButtonThree text="Don't Click Me!" color="red" fontSize={12} />
            <ButtonThree text="Click Me!" color="blue" fontSize={20} />
        </div>
    );
}

export { AppThree };

// Default props
function ButtonFour({ text="Click Me!", color="blue", fontSize=12 }) {
      const buttonStye = {
        color: color,
        fontSize: `${fontSize}px`,
    }

    return (<button style={buttonStye}>{text}</button>);
}

function AppFour() {
    return (
        <div>
            <ButtonFour />
            <ButtonFour text="Don't click me!" color="red" />
            <ButtonFour fontSize={20} />
        </div>
    );
}

export { AppFour };

// An alternative but deprecated appraoch: Seen in older codebases and class components.
function ButtonFive({ text, color, fontSize }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return <button style={buttonStyle}>{text}</button>;
}

ButtonFive.defaultProps = {
  text: "Click Me!",
  color: "blue",
  fontSize: 12
};

function AppFive() {
  return (
    <div>
      <ButtonFive />
      <ButtonFive text="Don't Click Me!" color="red" />
      <ButtonFive fontSize={20} />
    </div>
  );
}

export { AppFive };

// Functions as props
function ButtonSix({ text = "Click Me!", color = "blue", fontSize = 12, handleClick }) {
    const buttonStyle = {
        color: color,
        fontSize: fontSize + "px"
    };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}

export default function AppSix() {
  const handleButtonClick = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div>
      <Button handleClick={handleButtonClick} />
    </div>
  );
}


export { AppSix };

// Refactor function and supply an argument within Button to customize this functionality
function ButtonSeven({ text = "Click Me!", color = "blue", fontSize = 12, handleClick }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}

function AppSeven() {
  const handleButtonClick = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <ButtonSeven handleClick={() => handleButtonClick('https://www.theodinproject.com')} />
    </div>
  );
}

export { AppSeven };