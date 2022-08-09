/* eslint-disable react/jsx-no-bind */
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { DeleteTwoTone, ToolTwoTone } from '@ant-design/icons';
import { TaskContext } from '../../contexts/TaskContext';

const ActionButtons = ({ _id }) => {
  const { deleteTask, findTask, setShowUpdateTaskModal } = useContext(TaskContext);

  const chooseTask = taskId => {
    findTask(taskId);
    setShowUpdateTaskModal(true);
  };

  return (
    <>
      <Button className="post-button" onClick={chooseTask.bind(this, _id)}>
        <ToolTwoTone />
      </Button>
      <Button className="post-button" onClick={deleteTask.bind(this, _id)}>
        <DeleteTwoTone />
      </Button>
    </>
  );
};
ActionButtons.propTypes = {
  _id: PropTypes.string.isRequired,
};
export default ActionButtons;
