import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Index = () => {
  return (
    <div className="mt-auto shadow">
      <Container fluid>
        <Row className="p-3 text-center">
          <Col>
            <div>This is Footer</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
