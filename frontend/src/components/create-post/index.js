import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { addPost } from "../../redux/reducers/postSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ViewPost from "../view-post/index";

const Index = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [preview, setPreview] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const categories = [
    "Technology",
    "Science",
    "Travel",
    "Food",
    "Sports",
    "Other",
  ];

  const handleContentChange = (html) => {
    setFormData({
      ...formData,
      content: html,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPost = async () => {
    try {
      if (formData.title && formData.category && formData.content) {
        formData["date"] = moment();
        formData["time"] = moment().format("hh:mm A");
        formData["author"] = user?._id;
        const res = await dispatch(addPost(formData));
        if (res?.payload?.success) {
          handleClose();
        }
      } else {
        toast("Please fill out all the fields");
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const handlePreview = () => {
    setPreview(!preview);
  };

  const toolbarOptions = [
    [{ font: [] }],
    [
      "bold",
      "italic",
      "underline",
      "strike",
      { color: [] },
      { background: [] },
    ],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video"],
    [("blockquote", "code-block")],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }, { align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-xl">
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {preview ? (
            <ViewPost {...formData} />
          ) : (
            <>
              <Row>
                <Col xs={6} sm={6} md={7} xl={7}>
                  <Form.Group className="mb-3" controlId="title">
                    <Row>
                      <Col xs={2} sm={2} md={2} xl={2}>
                        <Form.Label>Title</Form.Label>
                      </Col>
                      <Col xs={6} sm={6} md={10} xl={10}>
                        <Form.Control
                          type="text"
                          name="title"
                          value={formData?.title}
                          onChange={handleChange}
                          size="sm"
                          required
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={5} xl={5}>
                  <Form.Group className="mb-3" controlId="category">
                    <Row>
                      <Col xs={6} sm={6} md={2} xl={2}>
                        <Form.Label>Category</Form.Label>
                      </Col>
                      <Col xs={6} sm={6} md={10} xl={10}>
                        <Form.Control
                          as="select" // Change input type to "select"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          size="sm"
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map((category, index) => (
                            <option value={category}>{category}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="content">
                    <Form.Label>Content</Form.Label>
                    <ReactQuill
                      theme="snow"
                      value={formData?.content}
                      onChange={handleContentChange}
                      modules={modules}
                    ></ReactQuill>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          <Row className="text-center">
            <Col>
              <Button
                className="m-2 mt-0 mb-0"
                variant="outline-dark"
                onClick={handlePreview}
              >
                Preview
              </Button>
              <Button
                className="m-2 mt-0 mb-0"
                variant="dark"
                onClick={() => handleAddPost()}
              >
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Index;
