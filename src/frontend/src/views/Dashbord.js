/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Col from 'react-bootstrap/Col';
import { PlusCircleFilled } from '@ant-design/icons';
import { TaskContext } from '../contexts/TaskContext';
import { AuthContext } from '../contexts/AuthContext';

import SingleTask from '../components/tasks/SingleTask';
import AddTaskModal from '../components/tasks/AddTaskModal';
import UpdateTaskModal from '../components/tasks/UpdateTaskModal';

const Dashboard = () => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    taskState: { task, tasks, tasksLoading },
    getTasks,
    setShowAddTaskModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(TaskContext);

  //  Get all tasks
  useEffect(() => getTasks(), []);

  let body = null;

  if (tasksLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (tasks.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Todo app</Card.Title>
            <Card.Text>Click the button below to track your work to do</Card.Text>
            <Button variant="primary" onClick={setShowAddTaskModal.bind(this, true)}>
              Add!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {tasks.map(a => (
            <Col key={a._id} className="my-2">
              <SingleTask task={a} />
            </Col>
          ))}
        </Row>

        {/* Open Add Task Modal */}
        <OverlayTrigger placement="left" overlay={<Tooltip>Add a new thing to do</Tooltip>}>
          <Button className="btn-floating">
            <PlusCircleFilled onClick={setShowAddTaskModal.bind(this, true)} style={{ fontSize: '350%' }} />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddTaskModal />
      {task !== null && <UpdateTaskModal />}
      {/* After task is added, show toast */}
      <Toast
        show={show}
        style={{ position: 'fixed', top: '20%', right: '10px' }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: '',
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
