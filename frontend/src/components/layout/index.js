import React from "react";
import Header from "../header/index";
import Footer from "../footer/index";

const Index = ({ children }) => {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <Header />
      <div className="m-auto container">{children}</div>
      <Footer />
    </div>
  );
};

export default Index;
