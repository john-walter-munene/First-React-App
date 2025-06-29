// Fix a broken clock

function Clock({ time }) {
    
    const hours = time.getHours();

  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
  );
}

function getDayOrNight(time) {
  const hours = time.getHours();
  return (hours >= 0 && hours <= 6) ? "night" : "day";
}

function UpdatedClock({ time }) {
  const className = getDayOrNight(time);

  return (
    <h1 id="time" className={className}>{time.toLocaleTimeString()}</h1>
  );
}

function DocsClock({ time }) {
  const hours = time.getHours();
  let className;

  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }

  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
export { Clock, UpdatedClock, DocsClock };