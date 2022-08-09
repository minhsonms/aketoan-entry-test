import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

const AddTaskModal = () => {
  // Contexts
  const { showAddTaskModal, setShowAddTaskModal, addTask, setShowToast } = useContext(TaskContext);

  // State
  const [newTask, setNewTask] = useState({
    title: '',
    status: 'false',
  });

  const { title } = newTask;

  const onChangeNewTaskForm = event => setNewTask({ ...newTask, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddTaskData();
  };

  const onSubmit = async event => {
    event.preventDefault();
    const { success, message } = await addTask(newTask);
    resetAddTaskData();
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  const resetAddTaskData = () => {
    setNewTask({ title: '', status: 'false' });
    setShowAddTaskModal(false);
  };

  return (
    <Modal show={showAddTaskModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to do?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control type="text" placeholder="Titke" name="title" required aria-describedby="title-help" value={title} onChange={onChangeNewTaskForm} />
            <Form.Text id="title-help" muted>
              *Required
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
