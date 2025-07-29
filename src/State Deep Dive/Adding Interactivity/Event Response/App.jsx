function Button() {
    const handleClick = () => console.log('You clicked me.');

    function handleHover() {
        console.log("Please click me");
    }

    return (
        <button onClick={handleClick} onMouseEnter={handleHover}>Click me</button>
    );
}

export { Button };

// Reading props in event handlers 
function AlertButton({ message, children }) {
    return (
        <button onClick={() => console.log(message)}>{children}</button>
    );   
}

function ToolBar() {
    return (
        <div>
            <AlertButton message={'Playing'}>Play Movie</AlertButton>
            <AlertButton message={'Uploading'}>Upload Image</AlertButton>
        </div>
    );
}

export { ToolBar };

// Passing event handlers as props 
function NewButton({ onClick, children }) {
    return (
        <button onClick={onClick}>{children}</button>
    );
}

function PlayButton({ movieName }) {
    const handlePlayClick = () => console.log(`Playing ${movieName}`);

    return (
        <NewButton onClick={handlePlayClick}>Play "{movieName}"</NewButton>
    );    
}

function UploadButton() {
    const handleUpload = () => console.log("Uploading")
    return (
        <NewButton onClick={handleUpload}>Upload Image</NewButton>
    );
}

function NewToolBar() {
    return (
       <div>
            <PlayButton movieName={`John Walter's programming journey.`}/>
            <UploadButton />
       </div>
    );
}

export { NewToolBar };

// Naming event handler props
// A getway into building my own components
function CustomButton({ onSmash, children }) {
    return (
        <button onClick={onSmash}>{children}</button>
    );
}

function CustomApp() {
    return (
        <div>
            <CustomButton onSmash={() => console.log('Playing')}>Play Movie</CustomButton>
            <CustomButton onSmash={() => console.log('Uploading')}>Upload Image</CustomButton>
        </div>
    );
}

export { CustomApp };

// When you need to support multiple interactions
// Might name event handler props for app specific concepts
function SupperApplication() {
    return (
        <SuperToolBar onPlayMovie={() => console.log('Playing')} 
            onUploadImage={() => console.log('Uploading')} />
    );
}

function SuperToolBar({ onPlayMovie, onUploadImage }) {
    return (
        <div>
            <SuperButton onClick={onPlayMovie}>Play Movie</SuperButton>
            <SuperButton onClick={onUploadImage}>Upload Image</SuperButton>
        </div>
    );
}

function SuperButton({ onClick, children}) {
    return (
        <button onClick={onClick}>{children}</button>
    );
}

export { SupperApplication };

// Event propagation 
function TestToolBar() {
    return (
        <div className="Toolbar" onClick={() => {alert('You clicked on the toolbar!');}}>
            <button onClick={() => alert('Playing!')}>Play Movie</button>
            <button onClick={() => alert('Uploading!')}>Upload Image</button>
        </div>
    );
}

// If you click on either button, its onClick will run first, followed by the parent <div>’s onClick. 
// So two messages will appear. If you click the toolbar itself, only the parent <div>’s onClick will run.

export { TestToolBar };

//  Stopping propargation.
function SuperTestButton({ onClick, children }) {
    const handleButtonClick = (event) => {
        event.stopPropagation();
        onClick();
    };

    return (
        <button onClick={handleButtonClick}>{children}</button>
    );
}

function SuperTestToolbar() {
    return (
        <div className="Toolbar" onClick={() => {alert('You clicked on the toolbar!');}}>
            <SuperTestButton onClick={() => alert('Playing!')}>Play Movie</SuperTestButton>
            <SuperTestButton onClick={() => alert('Uploading!')}>Upload Image</SuperTestButton>
        </div>
    );
}

export { SuperTestToolbar}

// Capture phase events 
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>

// Each event propagates in three phases:
// It travels down, calling all onClickCapture handlers.
// It runs the clicked element’s onClick handler.
// It travels upwards, calling all onClick handlers.
// Capture events are useful for code like routers or analytics, but you probably won’t use them in app code.

// Passing handlers as alternative to propagation
export default function ButtonX({ onClick, children }) {
  return (
    <button onClick={e => {
        e.stopPropagation();
        onClick();
    }}>{children}</button>
  );
}

// Can event handlers have side effects?
// Absolutely! Event handlers are the best place for side effects.
// More aboue these in a future play session.