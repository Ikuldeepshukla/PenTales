import React, { useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Layout from "../../components/layout/index";
import PostCard from "../../components/post-card/index";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/reducers/postSlice";
import { ToastContainer, toast } from "react-toastify";

const Index = () => {
  const { error, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);

  console.log(posts);
  return (
    <>
      <Layout>
        <Row className="mb-3 mt-3">
          <Col>
            <Form.Control type="text" placeholder="Search..." />
          </Col>
        </Row>
        <Row>
          {Array.isArray(posts) && posts.map((post) => (
            <Col key={post.id} md={6} sm={12} xl={4} lg={4} className="mb-3">
              <PostCard {...post} />
            </Col>
          ))}
        </Row>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default Index;
