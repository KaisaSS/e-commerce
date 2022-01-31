import React from "react";
import ShopMen from "../../assets/shopMens.jpg";
import ShopWomen from "../../assets/shopWomens.jpg";
import "./styles.scss";

const Directory = () => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${ShopWomen})` }}>
          <a href="">Shop Women's</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopMen})` }}>
          <a href="">Shop Men's</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
