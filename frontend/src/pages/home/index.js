import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import Layout from "../../components/layout/index";
import PostCard from "../../components/post-card/index";

const Index = () => {
  // for example
  const posts = [
    {
      id: 1,
      date: "2023-05-11",
      time: "10:30 AM",
      title: "First Post",
      content: "This is the content of the first post.",
    },
    {
      id: 2,
      date: "2023-05-12",
      time: "2:45 PM",
      title: "Second Post Second Post Second Post Second Post Second Post",
      content: "This is the content of the second post.",
    },
    {
      id: 3,
      date: "2023-05-13",
      time: "5:15 PM",
      title: "Third Post",
      content: "This is the content of the third post.",
    },
    {
      id: 1,
      date: "2023-05-11",
      time: "10:30 AM",
      title: "First Post",
      content: "This is the content of the first post.",
    },
    {
      id: 2,
      date: "2023-05-12",
      time: "2:45 PM",
      title: "Second Post Second Post Second Post Second Post Second Post",
      content: "This is the content of the second post.",
    },
    {
      id: 3,
      date: "2023-05-13",
      time: "5:15 PM",
      title: "Third Post",
      content: "This is the content of the third post.",
    },
    // Add more posts as needed
  ];

  return (
    <Layout>
      <Row className="mb-3 mt-3">
        <Col>
          <Form.Control type="text" placeholder="Search..." />
        </Col>
      </Row>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={6} sm={12} xl={4} lg={4} className="mb-3">
            <PostCard {...post} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Index;
