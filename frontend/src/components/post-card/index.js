import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const Index = ({ date, time, title, id }) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title as={Link} to={`/post/${id}`}>
          {title}
        </Card.Title>
        <Card.Text>
          Date: {date} <br />
          Time: {time}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Index;
