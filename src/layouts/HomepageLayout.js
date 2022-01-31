import React from "react";
import Header from "../components/Header";

const HomepageLayout = ({ children }) => {
  return (
    <div className="fullHeight">
      <Header />
      {children}
    </div>
  );
};

export default HomepageLayout;
