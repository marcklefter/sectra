import {
  useState,
  useEffect,
  useReducer
} from 'react';

type State = {
  count: number;
  incBy: number;
};

type Action = 
  { type: 'UPDATE' } |
  { type: 'CHANGE', incBy: number };

function Counter() {
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'UPDATE':
          return {
            count: state.count + state.incBy,
            incBy: state.incBy
          };

        case 'CHANGE':
          return {
            count: state.count,
            incBy: action.incBy
          };

        default:
          return state;
      }
    },
    {
      count: 0,
      incBy: 1
    }
  );

  useEffect(() => {
    const handle = setInterval(() => {
      dispatch({
        type: 'UPDATE'
      });
    }, 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <>
      <p>Count: {state.count}</p>
      <input
        type="number"
        value={state.incBy}
        onChange={e => dispatch({
          type: 'CHANGE',
          incBy: +e.target.value
        })}
      />
    </>
  );
}

export function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(true)}>Show Counter</button>
      <button onClick={() => setShow(false)}>Hide Counter</button>
      {show && <Counter />}
    </>
  )
}