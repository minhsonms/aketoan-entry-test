import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import React from 'react';
import PropTypes from 'prop-types';
import ActionButtons from './ActionButtons';

const SingleTask = ({ task: { _id, status, title } }) => (
  <Card className="shadow" border={status === true ? 'success' : 'danger'}>
    <Card.Body>
      <Card.Title>
        <Row>
          <Col>
            <p className="post-title">{title}</p>
            <Badge pill variant={status === true ? 'success' : 'danger'}>
              {status}
            </Badge>
          </Col>
          <Col className="text-right">
            <ActionButtons _id={_id} />
          </Col>
        </Row>
      </Card.Title>
    </Card.Body>
  </Card>
);
SingleTask.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  task: PropTypes.object.isRequired,
};
export default SingleTask;
