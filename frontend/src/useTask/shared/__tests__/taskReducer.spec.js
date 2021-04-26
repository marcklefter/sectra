import {
  taskReducer
} from '../taskReducer';

// ...

test('should throw an error for an unsupported action', () => {
  const fn = () => taskReducer(null, {
    type: 'TASK_UNKNOWN'
  });

  expect(fn).toThrow('Unsupported action type: TASK_UNKNOWN');
});

test('should return pending state upon task execute', () => {
  const state = taskReducer(
    {
      status: 'idle',
      value: null,
      error: null
    }, 
    {
      type: 'TASK_EXECUTE'
    }
  );

  expect(state).toEqual({
    status: 'pending',
    value: null,
    error: null
  });
});

test('should return resolved state upon task success', () => {
  const state = taskReducer(
    {
      status: 'pending',
      value: null,
      error: null
    }, 
    {
      type: 'TASK_SUCCESS',
      payload: 'foo'
    }
  );

  expect(state).toEqual({
    status: 'resolved',
    value: 'foo',
    error: null
  });
});

test('should return rejected state upon task failure', () => {
  const error = new Error('task failed');

  const state = taskReducer(
    {
      status: 'pending',
      value: null,
      error: null
    }, 
    {
      type: 'TASK_FAILURE',
      payload: error
    }
  );

  expect(state).toEqual({
    status: 'rejected',
    value: null,
    error
  });
});

test('should return initial state upon task cancel', () => {
  const state = taskReducer(
    {
      status: 'pending',
      value: null,
      error: null
    }, 
    {
      type: 'TASK_CANCEL'
    }
  );

  expect(state).toEqual({
    status: 'idle',
    value: null,
    error: null
  });
});