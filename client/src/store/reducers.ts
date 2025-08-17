//reducer.ts
import { Task } from '../types';
import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, FETCH_TASKS_REQUEST, FETCH_TASKS_FAILURE } from './actiontype';
import { TaskActionTypes } from './actions';

interface TaskState {
  user: any;  // This should be the type of the user you're expecting
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  user: null,  // Set a default value, such as null or an empty object
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = (state = initialState, action: TaskActionTypes): TaskState => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TASKS:
      return { ...state, tasks: action.payload, loading: false };
    case FETCH_TASKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] }; // Add new task to state
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ), // Update existing task in state
      };
    default:
      return state;
  }
};
