import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/reducers/userSlice";

const Index = ({ handleClose, openSignIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData && formData.name && formData.email && formData.password) {
      dispatch(signupUser(formData));
    }
  };

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user]);

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSignUp}>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
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
                  onChange={handleChange}
                  value={formData.password}
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
                onClick={openSignIn}
              >
                Sign In
              </Button>
            </Col>
            <Col md="auto">
              <Button type="submit" size="sm" variant="dark">
                Sign Up
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col>{error && error}</Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default Index;
