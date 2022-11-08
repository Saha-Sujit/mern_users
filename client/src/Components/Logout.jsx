import React from "react";
import styled from "styled-components";

const Button = styled.button`
  color: white;
  background-color: black;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #222;
  }
  @media only screen and (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Logout = () => {
  const handleClick = () => {
    localStorage.removeItem("user");
    window.location = "/";
  };

  return (
    <>
      <Button onClick={handleClick}>Logout</Button>
    </>
  );
};

export default Logout;
