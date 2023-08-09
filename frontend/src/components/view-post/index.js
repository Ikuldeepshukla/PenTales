import React from "react";
import { Container, Card } from "react-bootstrap";
import parse from "html-react-parser";

const Index = ({ _id, title, time, date, category, content }) => {
  return (
    <Container className="mt-4 mb-4">
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {date && time && (
            <Card.Subtitle className="mb-2 text-muted">
              {date} &nbsp; {time}
            </Card.Subtitle>
          )}
          <Card.Text>Category: {category}</Card.Text>
          <div>{parse(content)}</div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Index;
