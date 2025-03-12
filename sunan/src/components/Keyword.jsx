import React from "react";

const Keyword = ({ text = "testing" }) => {
  const style = {
    width: "500px",
    height: "300px",
    backgroundColor: "white",
    color: "black",
    padding: "10px",
    border: "10 px solid black",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "bold",
  };

  return <div style={style}>{text}</div>;
};

export default Keyword;
