import { useState } from "react";

import { Box } from "./Box";
import { Background } from "./Background";

// Fix incorrect state updates 
function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    player.score++;
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>Score: <b>{player.score}</b> {' '}<button onClick={handlePlusClick}>+1</button></label>
      <label>First name: <input value={player.firstName} onChange={handleFirstNameChange} /></label>
      <label>Last name: <input value={player.lastName} onChange={handleLastNameChange} /></label>    
    </>
  );
}


// Solution.
// Fix incorrect state updates 
function UpdatedScoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  const handlePlusClick = () => {
        setPlayer({...player, score: player.score + 1});
    };

  const handleFirstNameChange = (event) => {
    setPlayer({
      ...player,
      firstName: event.target.value,
    });
  };

  const handleLastNameChange = (event) => {
    setPlayer({
        ...player,
      lastName: event.target.value
    });
  };

  return (
    <>
      <label>Score: <b>{player.score}</b> {' '}<button onClick={handlePlusClick}>+1</button></label>
      <label>First name: <input value={player.firstName} onChange={handleFirstNameChange} /></label>
      <label>Last name: <input value={player.lastName} onChange={handleLastNameChange} /></label>    

      <p>My name is {`${player.firstName} ${player.lastName}`}</p>
    </>
  );
}


export { Scoreboard, UpdatedScoreboard };

// Find and fix the mutation.
const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  // Here's the mutation, fix by using setState func.
function handleMove(dx, dy) {
  // ❌ Don't mutate state directly
  // shape.position.x += dx;
  // shape.position.y += dy;

  // ⚠️ This works for most cases, but can lead to stale state during rapid updates
  // setShape({
  //   ...shape,
  //   position: {
  //     x: shape.position.x + dx,
  //     y: shape.position.y + dy
  //   }
  // });

  // Equivalent to:
  // const nextPosition = { x: shape.position.x + dx, y: shape.position.y + dy };
  // const nextShape = { ...shape, position: nextPosition };
  // setShape(nextShape);

  // ✅ Best practice: Use functional updater to avoid stale state
  setShape(prevShape => ({
    ...prevShape,
    position: {
      x: prevShape.position.x + dx,
      y: prevShape.position.y + dy
    }
  }));
}




  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
