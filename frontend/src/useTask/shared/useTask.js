import {
  useState,
  useEffect,
  useReducer
} from 'react';

import {
  taskReducer
} from './taskReducer';

export const useTask = () => {
  const [
    state, 
    dispatch
  ] = useReducer(taskReducer, {
    status: 'idle',
    value: null,
    error: null
  });

  const [
    task,
    setTask
  ] = useState(null);

  useEffect(() => {
    if (!task) {
      return;
    }

    dispatch({
      type: 'TASK_EXECUTE'
    });

    task
      .then(value => {
        if (!task.cancelled) {
          dispatch({
            type: 'TASK_SUCCESS',
            payload: value
          });
        }
      })
      .catch(error => {
        if (!task.cancelled) {
          dispatch({
            type: 'TASK_FAILURE',
            payload: error
          });
        }
      });
    
    return () => {
      task.cancel?.();
      task.cancelled = true;
    }
  }, [task]);

  const cancel = () => {
    setTask(null);

    dispatch({
      type: 'TASK_CANCEL'
    });
  };

  return {
    ...state,
    run: setTask,
    cancel
  };
}