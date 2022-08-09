import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

const UpdateTaskModal = () => {
  // Contexts
  const {
    taskState: { task },
    showUpdateTaskModal,
    setShowUpdateTaskModal,
    updateTask,
    setShowToast,
  } = useContext(TaskContext);

  // State
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => setUpdatedTask(task), [task]);

  const { title, status } = updatedTask;

  const onChangeUpdatedTaskForm = event => setUpdatedTask({ ...updatedTask, [event.target.name]: event.target.value });

  const closeDialog = () => {
    setUpdatedTask(task);
    setShowUpdateTaskModal(false);
  };

  const onSubmit = async event => {
    event.preventDefault();
    const { success, message } = await updateTask(updatedTask);
    setShowUpdateTaskModal(false);
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  return (
    <Modal show={showUpdateTaskModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedTaskForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control as="select" value={status} name="status" onChange={onChangeUpdatedTaskForm}>
              <option value="false">dang lam</option>
              <option value="true">da xong</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateTaskModal;
