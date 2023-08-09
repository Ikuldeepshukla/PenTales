import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { AiOutlineComment } from "react-icons/ai";

const Index = ({ _id, date, title, category, content, comments }) => {
  const getClass = (category) => {
    const classes = {
      Technology: "primary",
      Science: "secondary",
      Travel: "success",
      Food: "danger",
      Sports: "dark",
      Other: "info",
    };
    return classes[category];
  };

  const getFormattedDate = (date) => moment(date).format("DD-MM-YYYY hh:mmA");

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>
          <Row>
            <Col md={8} xl={8} xs={8} xm={8}>
              <Link to={`/post/${_id}`}>
                <h6>{title}</h6>
              </Link>
            </Col>
            <Col className="text-end">
              <h6>
                <Badge bg={getClass(category)}>{category}</Badge>
              </h6>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          <Row>
            <Col md={8} xl={8} xs={8} xm={8}>
              <small> Posted: {getFormattedDate(date)} </small>
            </Col>
            {comments && (
              <Col className="text-end">
                {comments.length} <AiOutlineComment />
              </Col>
            )}
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Index;
