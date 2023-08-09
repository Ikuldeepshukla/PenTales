import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppLogo } from "../../assets/export-asset";
import { Badge, Button, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "../signin/index";
import SignUp from "../signup/index";
import CreatePost from "../create-post";
import { signoutUser } from "../../redux/reducers/userSlice";

const Index = () => {
  const [popup, setPopup] = useState({
    signIn: false,
    signUp: false,
    createPost: false,
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const openSignIn = () => {
    handleClose();
    setPopup((prevPopup) => ({ ...prevPopup, signIn: true }));
  };

  const openSignUp = () => {
    handleClose();
    setPopup((prevPopup) => ({ ...prevPopup, signUp: true }));
  };

  const openCreatePost = () => {
    handleClose();
    setPopup((prevPopup) => ({ ...prevPopup, createPost: true }));
  };

  const handleClose = () => {
    setPopup({
      signIn: false,
      signUp: false,
      createPost: false,
    });
  };

  const handleAddPost = () => {};

  const handleSignOut = () => {
    dispatch(signoutUser());
  };

  useEffect(() => {
    if (user && Object.keys(user).length) {
      setLoggedInUser(user);
    } else {
      setLoggedInUser(null);
    }
  }, [user]);

  console.log("POPUP", user);
  return (
    <>
      {popup.signIn && (
        <SignIn
          show={popup.signIn}
          handleClose={handleClose}
          openSignUp={openSignUp}
        />
      )}
      {popup.signUp && (
        <SignUp
          show={popup.signUp}
          handleClose={handleClose}
          openSignIn={openSignIn}
        />
      )}
      {popup.createPost && (
        <CreatePost show={popup.createPost} handleClose={handleClose} />
      )}
      <Navbar bg="body-tertiary" expand="lg" shadow>
        <div className="container">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <div>Pen Tales &nbsp;</div>
            <img src={AppLogo} height="30" alt="Pen Tales logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to="/" active>
                Feed
              </Nav.Link>
              <Nav.Link as={Link} to="/profile" active>
                Profile
              </Nav.Link>
            </Nav>
            {loggedInUser ? (
              <div className="d-flex">
                <div className="m-2 mt-0 mb-0">
                  Welcome {loggedInUser?.name} 😃
                </div>
                <Button
                  variant="outline-dark"
                  onClick={openCreatePost}
                  size="sm"
                >
                  Add Post
                </Button>
                <Button
                  variant="outline-dark"
                  size="sm"
                  className="m-2 mt-0 mb-0"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="d-flex">
                <div className="m-2 mt-0 mb-0">
                  Hi there! Please signin or signup to create your post 😃
                </div>
                <Button
                  variant="outline-dark"
                  size="sm"
                  className="m-2 mt-0 mb-0"
                  onClick={openSignIn}
                >
                  Signin
                </Button>
                <Button
                  variant="outline-dark"
                  size="sm"
                  className="m-2 mt-0 mb-0"
                  onClick={openSignUp}
                >
                  Signup
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Index;
