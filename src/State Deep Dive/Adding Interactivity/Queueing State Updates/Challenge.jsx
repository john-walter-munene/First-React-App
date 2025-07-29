import { useState } from "react";

function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCompleted(completed + 1);
  }

  return (
    <>
      <h3>Pending: {pending}</h3>
      <h3>Completed: {completed}</h3>
      <button onClick={handleClick}>Buy</button>
    </>
  );
}

function UpdayedRequestTracker() {
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);

    const handleClick = async () => {
        setCompleted(pending => pending + 1);
        await delay(3000);
        setPending(pending => pending - 1);
        setCompleted(completed => completed + 1);
    };

    return (
        <>
            <h3>Pending: {pending}</h3>
            <h3>Completed: {completed}</h3>
            <button onClick={handleClick}>buy</button>
        </>
    );
}

function delay(milliSeconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliSeconds)
    });
}
export { RequestTracker,UpdayedRequestTracker };