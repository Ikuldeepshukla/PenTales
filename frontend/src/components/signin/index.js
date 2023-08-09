import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { signinUser } from "../../redux/reducers/userSlice";

const Index = ({ show, handleClose, openSignUp }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignIn = (e) => {
    e.preventDefault();
    if (formData && formData.email && formData.password) {
      dispatch(signinUser(formData));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (user && Object.keys(user).length) {
      handleClose();
    }
  }, [user]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSignIn}>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col md="auto">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={openSignUp}
              >
                Sign Up
              </Button>
            </Col>
            <Col md="auto">
              <Button type="submit" size="sm" variant="dark">
                Sign In
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Index;
