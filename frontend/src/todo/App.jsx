import {
  useState,
  useReducer,
  useCallback
} from 'react'

import {
  unstable_trace as trace
} from 'scheduler/tracing';

import {
  useDocumentTitle,
  useMode,
  useMemoMode,
  useAsyncMode
} from './hooks';

import {
  TodoForm
} from './TodoForm';

import {
  Todo
} from './Todo';

import {
  todosReducer
} from './todosReducer';

// ...

const style = {
  width: 'calc(100% / 3)',
  margin: '150px auto auto auto'
}

export const App = () => {
  const [todos, dispatch] = useReducer(
    todosReducer,
    require('./todos.json')
  );

  const [focusedTodo, setFocusedTodo] = useState(null);

  useDocumentTitle(
    () => todos
      ? `Todos (${todos.reduce(
        (count, todo) => (!todo.completed ? ++count : count),
        0
      )})`
      : ''
  );

  // prepare to get the mode (= most frequently used word) in the set of all todo titles.
  const titles = (todos || []).map(({ title }) => title);

  // ...
  // const mfw = useMode(titles);
  // const mfw = useMemoMode(titles);
  const mfw = useAsyncMode(titles);
  console.log('Mode: ' + (mfw ?? 'N/A'));

  const createTodo = title => {
    trace('CREATE_TODO', performance.now(), () => {
      dispatch({
        type: "CREATE_TODO",
        title,
      });
    });
  };

  const deleteTodo = useCallback(todoId => {
    dispatch({
      type: 'DELETE_TODO',
      todoId,
    });
  }, []);

  const updateTodo = useCallback(todoId => {
    dispatch({
      type: 'UPDATE_TODO',
      todoId,
    });
  }, []);

  return (
    <div style={style}>
      <TodoForm createTodo={createTodo} />

      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}

          focused={focusedTodo === todo.id}
          setFocused={setFocusedTodo}
        />
      ))}
    </div>
  );
}
