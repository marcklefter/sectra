export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'TASK_EXECUTE':
      return {
        ...state,
        status: 'pending'
      };

    case 'TASK_SUCCESS':
      return {
        ...state,
        status: 'resolved',
        value: action.payload
      };

    case 'TASK_FAILURE':
      return {
        ...state,
        status: 'rejected',
        error: action.payload
      };

    case 'TASK_CANCEL':
      return {
        status: 'idle',
        value: null,
        error: null
      }

    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}