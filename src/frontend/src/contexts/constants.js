export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : 'https://sleepy-inlet-56101.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'todo-app';

export const TASKS_LOADED_SUCCESS = 'TASKS_LOADED_SUCCESS';
export const TASKS_LOADED_FAIL = 'TASKS_LOADED_FAIL';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const FIND_TASK = 'FIND_TASK';
