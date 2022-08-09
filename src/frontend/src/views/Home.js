// import Button from 'react-bootstrap/Button';
import { Button } from 'antd';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';

const Home = () => {
  return (
    <Row className="mt-5" style={{ marginRight: 0 }}>
      <Col className="text-center">
        <Button type="default" href="https://github.com/minhsonms">
          Visit my github
        </Button>
        {/* <Button variant="primary" href="https://github.com/minhsonms" size="lg">
          Visit my github
        </Button> */}
      </Col>
    </Row>
  );
};

export default Home;
