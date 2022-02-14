import React from "react";
import Button from "../forms/Button";

const LoadMore = ({ onLoadMoreEvent = () => {} }) => {
  return <Button onClick={() => onLoadMoreEvent()}>Load more</Button>;
};

export default LoadMore;
