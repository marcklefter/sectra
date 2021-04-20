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

// function to initialize the state managed by useReducer. 
//
// See https://reactjs.org/docs/hooks-reference.html#lazy-initialization for more information.
const setInitialState = (initialState: State) => {
  return {
    count: Number(window.localStorage.getItem('count')) ?? initialState.count,
    incBy: initialState.incBy
  };
};

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
    // this "default" state is passed to setInitialState.
    {
      count: 0,
      incBy: 1
    },
    setInitialState
  );

  const {
    count
  } = state;

  useEffect(() => {
    window.localStorage.setItem('count', count.toString());
  }, [count]);

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