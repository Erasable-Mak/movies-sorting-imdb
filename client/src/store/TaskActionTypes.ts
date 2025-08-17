import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, FETCH_TASKS_REQUEST, FETCH_TASKS_FAILURE } from './actiontype';
import { Task } from '../types';

// Define action types as literal string types
export interface FetchTasksAction {
  type: typeof FETCH_TASKS;
  payload: Task[];
}

export interface CreateTaskAction {
  type: typeof CREATE_TASK;
  payload: Task;
}

export interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: Task;
}

export interface FetchTasksRequestAction {
  type: typeof FETCH_TASKS_REQUEST;
}

export interface FetchTasksFailureAction {
  type: typeof FETCH_TASKS_FAILURE;
  payload: string;  // Error message
}

// Combine the above action interfaces into a union type
export type TaskActionTypes =
  | FetchTasksAction
  | CreateTaskAction
  | UpdateTaskAction
  | FetchTasksRequestAction
  | FetchTasksFailureAction;

//TaskActionTypes.ts  