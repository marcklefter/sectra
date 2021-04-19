import {
  useState,
  useEffect
} from 'react';

const Counter = () => {
  const [count, setCount] = useState(
    () => Number(window.localStorage.getItem('count')) ?? 0
  );

  const [incBy, setIncBy] = useState(1);

  useEffect(() => {
    window.localStorage.setItem('count', count.toString());
  }, [count]);

  useEffect(() => {
    console.log('timer:start');

    const handle = setInterval(() => {
      setCount(prevCount => prevCount + incBy);
    }, 1000);

    return () => {
      console.log('timer:stop');
      
      clearInterval(handle);
    }
  }, [incBy]);

  return (
    <>
      <p>Count: {count}</p>
      <input
        type="number"
        value={incBy}
        onChange={e => setIncBy(+e.target.value)}
      />
    </>
  )
}

export const App = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(true)}>Show Counter</button>
      <button onClick={() => setShow(false)}>Hide Counter</button>
      {show && <Counter />}
    </>
  )
}