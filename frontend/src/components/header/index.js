import React from "react";
import { Link } from "react-router-dom";
import { AppLogo } from "../../assets/export-asset";

const Index = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div>Pen Tales &nbsp;</div>
          <img src={AppLogo} height="30" alt="Pen Tales logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Feed
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/profile"
              >
                Profile
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <button
              className="btn btn-outline-dark btn-sm m-2 mt-0 mb-0"
              type="submit"
            >
              Signin
            </button>
            <button
              className="btn btn-outline-dark btn-sm m-2 mt-0 mb-0"
              type="submit"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Index;
