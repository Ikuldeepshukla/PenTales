import React from "react";
import Header from "../header/index";
import Footer from "../footer/index";
import { Container, Row, Col } from "react-bootstrap";

const Index = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1">{children}</Container>
      <Footer />
    </div>
  );
};

export default Index;
