// actions.ts
import { Task } from '../types';
import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, FETCH_TASKS_REQUEST, FETCH_TASKS_FAILURE } from './actiontype';
import { Dispatch } from 'redux';
import axios from 'axios';

// Action Types
interface FetchTasksAction {
  type: typeof FETCH_TASKS;
  payload: Task[];
}

interface CreateTaskAction {
  type: typeof CREATE_TASK;
  payload: Task;
}

interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: Task;
}

// New action types for the loading and failure states
interface FetchTasksRequestAction {
  type: typeof FETCH_TASKS_REQUEST;
}

interface FetchTasksFailureAction {
  type: typeof FETCH_TASKS_FAILURE;
  payload: string; // Error message
}

// Union Action Type
export type TaskActionTypes =
  | FetchTasksAction
  | CreateTaskAction
  | UpdateTaskAction
  | FetchTasksRequestAction
  | FetchTasksFailureAction; // Add new action types

// Thunk Action Creators
export const fetchTasks = () => async (dispatch: Dispatch<TaskActionTypes>) => {
  dispatch({ type: FETCH_TASKS_REQUEST }); // Dispatch the loading state

  try {
    const response = await axios.get('/api/tasks');
    dispatch({ type: FETCH_TASKS, payload: response.data });
  } catch (error: unknown) {  // Here, we specify 'unknown' type for error
    if (error instanceof Error) {
      // Now error is guaranteed to be an instance of Error, so we can safely access error.message
      dispatch({
        type: FETCH_TASKS_FAILURE,
        payload: error.message,  // Access the message from the error object
      });
    } else {
      // If the error is not an instance of Error, we can handle it more generically
      dispatch({
        type: FETCH_TASKS_FAILURE,
        payload: 'An unexpected error occurred.',
      });
    }
  }
};

export const createTask = (task: Task) => async (dispatch: Dispatch<TaskActionTypes>) => {
  try {
    const response = await axios.post('/api/tasks', task);
    dispatch({ type: CREATE_TASK, payload: response.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
    } else {
      dispatch({ type: FETCH_TASKS_FAILURE, payload: 'An unexpected error occurred.' });
    }
  }
};

export const updateTask = (id: number, task: Task) => async (dispatch: Dispatch<TaskActionTypes>) => {
  try {
    const response = await axios.put(`/api/tasks/${id}`, task);
    dispatch({ type: UPDATE_TASK, payload: response.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
    } else {
      dispatch({ type: FETCH_TASKS_FAILURE, payload: 'An unexpected error occurred.' });
    }
  }
};




// import { Dispatch } from 'redux'; // Import Dispatch from Redux
// import axios from 'axios'; // Axios for making HTTP requests
// import { Task } from '../types'; // Assuming Task type is defined here

// // Action types (defined as constants in actiontype.ts)
// import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, FETCH_TASKS_REQUEST, FETCH_TASKS_FAILURE } from './actiontype';

// // Action Interfaces
// export interface FetchTasksAction {
//   type: typeof FETCH_TASKS;
//   payload: Task[];
// }

// export interface CreateTaskAction {
//   type: typeof CREATE_TASK;
//   payload: Task;
// }

// export interface UpdateTaskAction {
//   type: typeof UPDATE_TASK;
//   payload: Task;
// }

// export interface FetchTasksRequestAction {
//   type: typeof FETCH_TASKS_REQUEST;
// }

// export interface FetchTasksFailureAction {
//   type: typeof FETCH_TASKS_FAILURE;
//   payload: string;  // Error message
// }

// // Union type for all possible actions
// export type TaskActionTypes =
//   | FetchTasksAction
//   | CreateTaskAction
//   | UpdateTaskAction
//   | FetchTasksRequestAction
//   | FetchTasksFailureAction;

// // Helper function to get token from localStorage and add to headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('authToken');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // Thunk Action Creators
// export const fetchTasks = () => async (dispatch: Dispatch<TaskActionTypes>) => {
//   dispatch({ type: FETCH_TASKS_REQUEST });

//   try {
//     const response = await axios.get('http://localhost:5000/tasks', {
//       headers: getAuthHeaders(), // Add token to request headers
//     });
//     dispatch({ type: FETCH_TASKS, payload: response.data });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
//     } else {
//       dispatch({ type: FETCH_TASKS_FAILURE, payload: 'An unexpected error occurred.' });
//     }
//   }
// };

// export const createTask = (task: Task) => async (dispatch: Dispatch<TaskActionTypes>) => {
//   try {
//     const response = await axios.post('http://localhost:5000/tasks', task, {
//       headers: getAuthHeaders(), // Add token to request headers
//     });
//     dispatch({ type: CREATE_TASK, payload: response.data });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
//     } else {
//       dispatch({ type: FETCH_TASKS_FAILURE, payload: 'An unexpected error occurred.' });
//     }
//   }
// };

// export const updateTask = (id: number, task: Task) => async (dispatch: Dispatch<TaskActionTypes>) => {
//   try {
//     const response = await axios.put(`http://localhost:5000/tasks/${id}`, task, {
//       headers: getAuthHeaders(), // Add token to request headers
//     });
//     dispatch({ type: UPDATE_TASK, payload: response.data });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
//     } else {
//       dispatch({ type: FETCH_TASKS_FAILURE, payload: 'An unexpected error occurred.' });
//     }
//   }
// };
