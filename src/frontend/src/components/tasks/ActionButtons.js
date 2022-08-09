import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
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
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={deleteTask.bind(this, _id)}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};
ActionButtons.propTypes = {
  _id: PropTypes.func.isRequired,
};
export default ActionButtons;
