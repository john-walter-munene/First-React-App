import { useState } from "react";

function StartComponent() {
 const [x, setX] = useState(0);
 const [y, setY] = useState(0);

 typeof x, typeof setX, typeof y, typeof setY // Clear console error.

 return (<>(x,y) = ({x}{y})</>);

}

function AltStartComponent() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    typeof position, typeof setPosition // Clear console error.

    return (<>Position {position.x},{position.y}</>);
}


function MovingDot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return (
    <div onPointerMove={e => setPosition({ x: e.clientX, y: e.clientY })}
        style={{ position: 'relative', width: '100vw', height: '100vh', }}>
            <div style={{ position: 'absolute', backgroundColor: 'red', borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`, left: -10, top: -10, width: 20, height: 20,
      }} /></div>
  )
}

export { StartComponent, AltStartComponent, MovingDot };