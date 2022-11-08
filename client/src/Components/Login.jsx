import React, { useState } from "react";
import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #02c6dc, #0082dc);
  position: relative;
`;
const H1 = styled.h1`
  font-size: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const H1Span = styled.span`
  font-size: 50px;
`;
const Form = styled.form`
  width: 20%;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 30px;
  padding: 20px;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;
const Input = styled.input`
  padding: 10px 40px;
  padding-left: 10px;
  border-radius: 7px;
  border: 1px solid #999;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #999;
  }
`;
const Button = styled.button`
  padding: 12px 20px;
  border: none;
  color: white;
  background-color: black;
  border-radius: 7px;
  cursor: pointer;
  font-size: 16px;
`;
const Text = styled.p`
  font-size: 13px;
  text-align: center;
`;

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      localStorage.setItem("user", res.data.user._id);
      window.location = "/";
    });
  };
  return (
    <>
      <Container>
        <Form>
          <H1>
            <H1Span>
              <BsPersonCircle />
            </H1Span>
            Sign In
          </H1>
          <Input
            type="email"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Sign In</Button>
          <Text>
            Don't have an account. <Link to="/signup">Sign Up</Link>
          </Text>
        </Form>
      </Container>
    </>
  );
};

export default Login;
