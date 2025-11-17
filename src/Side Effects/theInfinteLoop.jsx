// The infinite loop and side-effect updating state
import { useEffect, useState, useRef } from 'react';

function CountInputChanges() {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(-1);

  useEffect(() => setCount(count + 1));

  const onChange = ({ target }) => setValue(target.value);

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <div>Number of changes: {count}</div>
    </div>
  )
}

export { CountInputChanges };

// 1.1 Fixing dependencies

function CountInputChangesTwo() {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(-1);

  useEffect(() => setCount(count + 1), [value]);

  const onChange = ({ target }) => setValue(target.value);

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <div>Number of changes: {count}</div>
    </div>
  );
}

// 1.2 Using a reference

function CountInputChangesThree() {
  const [value, setValue] = useState('');
  const countRef = useRef(0);

  const onChange = ({ target }) => {
    setValue(target.value);
    countRef.current++;
  };

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <div>Number of changes: {countRef.current}</div>
    </div>
  );
}

export { CountInputChangesTwo, CountInputChangesThree };

// The infinite loop and new objects references
function CountSecrets() {
  const [secret, setSecret] = useState({ value: "", countSecrets: 0 });

  useEffect(() => {
    if (secret.value === 'secret') {
      setSecret(s => ({...s, countSecrets: s.countSecrets + 1}));
    }
  }, [secret]);

  const onChange = ({ target }) => {
    setSecret(s => ({ ...s, value: target.value }));
  };

  return (
    <div>
      <input type="text" value={secret.value} onChange={onChange} />
      <div>Number of secrets: {secret.countSecrets}</div>
    </div>
  );
}

export { CountSecrets };

// 2.1 Avoid objects as dependencies
// let count = 0;

// useEffect(() => {
//   // some logic
// }, [count]); // Good!
// let myObject = {
//   prop: 'Value'
// };

// useEffect(() => {
//   // some logic
// }, [myObject]); // Not good!

// useEffect(() => {
//   // some logic
// }, [myObject.prop]);

// Fixing the above count secret coponent.
function CountSecretsTwo() {
  const [secret, setSecret] = useState({ value: "", countSecrets: 0 });

  useEffect(() => {
    if (secret.value === 'secret') {
      setSecret(s => ({...s, countSecrets: s.countSecrets + 1}));
    }
  }, [secret.value]);

  const onChange = ({ target }) => {
    setSecret(s => ({ ...s, value: target.value }));
  };

  return (
    <div>
      <input type="text" value={secret.value} onChange={onChange} />
      <div>Number of secrets: {secret.countSecrets}</div>
    </div>
  );
}

export { CountSecretsTwo };