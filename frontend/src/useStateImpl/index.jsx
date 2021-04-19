import {
  useReducer
} from 'react';

// ...
// Reimplementation of React's useState hook, with useReducer.
const useState = initialValue => {
  return useReducer(
    (state, dispatchedWith) => typeof dispatchedWith === 'function'
      ? dispatchedWith(state)
     : dispatchedWith,
    initialValue
  );
}

export function App() {
  const [count, setCount] = useState(0);

  // support both variants of the state updater function.
  const inc = () => setCount(count + 1);
  // const inc = () => setCount(prevCount => prevCount + 1);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={inc}>Increment</button>
    </>
  )
}