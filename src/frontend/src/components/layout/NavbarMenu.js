import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { LogoutOutlined, SnippetsOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext';

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <>
      <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
        <Navbar.Brand className="font-weight-bolder text-white">
          <SnippetsOutlined />
          Todo app
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="font-weight-bolder text-white" to="/home" as={Link}>
              Home
            </Nav.Link>
            <Nav.Link className="font-weight-bolder text-white" to="/dashboard" as={Link}>
              Todo List
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Welcome {username}
            </Nav.Link>
            <Button variant="secondary" className="font-weight-bolder text-white" onClick={logout}>
              <LogoutOutlined />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
