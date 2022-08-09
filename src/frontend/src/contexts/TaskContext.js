/* eslint-disable no-underscore-dangle */
import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import taskReducer from '../reducers/taskReducer';
import { apiUrl, TASKS_LOADED_FAIL, TASKS_LOADED_SUCCESS, ADD_TASK, DELETE_TASK, UPDATE_TASK, FIND_TASK } from './constants';

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  // State
  const [taskState, dispatch] = useReducer(taskReducer, {
    task: null,
    tasks: [],
    tasksLoading: true,
  });

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  // Get all tasks
  const getTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tasks`);
      if (response.data.success) {
        dispatch({ type: TASKS_LOADED_SUCCESS, payload: response.data.tasks });
      }
    } catch (error) {
      dispatch({ type: TASKS_LOADED_FAIL });
    }
  };

  // Add task
  // eslint-disable-next-line consistent-return
  const addTask = async newTask => {
    try {
      const response = await axios.post(`${apiUrl}/tasks`, newTask);
      if (response.data.success) {
        dispatch({ type: ADD_TASK, payload: response.data.task });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // Delete task
  const deleteTask = async taskId => {
    try {
      const response = await axios.delete(`${apiUrl}/tasks/${taskId}`);
      if (response.data.success) dispatch({ type: DELETE_TASK, payload: taskId });
    } catch (error) {
      console.info(error);
    }
  };

  // Find task when user is updating task
  const findTask = taskId => {
    const task = taskState.tasks.find(a => a._id === taskId);
    dispatch({ type: FIND_TASK, payload: task });
  };

  // Update task
  // eslint-disable-next-line consistent-return
  const updateTask = async updatedTask => {
    try {
      const response = await axios.put(`${apiUrl}/tasks/${updatedTask._id}`, updatedTask);
      if (response.data.success) {
        dispatch({ type: UPDATE_TASK, payload: response.data.task });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // task context data
  const taskContextData = {
    taskState,
    getTasks,
    showAddTaskModal,
    setShowAddTaskModal,
    showUpdateTaskModal,
    setShowUpdateTaskModal,
    addTask,
    showToast,
    setShowToast,
    deleteTask,
    findTask,
    updateTask,
  };

  return <TaskContext.Provider value={taskContextData}>{children}</TaskContext.Provider>;
};
TaskContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default TaskContextProvider;
