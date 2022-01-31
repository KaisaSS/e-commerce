import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="company logo" />
          </Link>
        </div>
        <div className="callToActions">
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
