/* eslint-disable no-underscore-dangle */
import { TASKS_LOADED_SUCCESS, TASKS_LOADED_FAIL, ADD_TASK, DELETE_TASK, UPDATE_TASK, FIND_TASK } from '../contexts/constants';

const taskReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASKS_LOADED_SUCCESS:
      return {
        ...state,
        tasks: payload,
        tasksLoading: false,
      };

    case TASKS_LOADED_FAIL:
      return {
        ...state,
        tasks: [],
        tasksLoading: false,
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(a => a._id !== payload),
      };

    case FIND_TASK:
      return { ...state, task: payload };

    case UPDATE_TASK: {
      const newTasks = state.tasks.map(task => (task._id === payload._id ? payload : task));

      return {
        ...state,
        tasks: newTasks,
      };
    }
    default:
      return state;
  }
};
export default taskReducer;
