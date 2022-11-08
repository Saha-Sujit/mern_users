import React, { useState } from "react";
import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
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
  width: 25%;
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

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  console.log(user);
  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(value);
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = user;
    if (firstname && lastname && email && password) {
      axios.post("https://mern-users.vercel.app/register", user).then((res) => {
        alert(res.data.message);
        window.location = "/signin";
      });
    } else {
      alert("all field are required!");
    }
  };
  return (
    <>
      <Container>
        <Form>
          <H1>
            <H1Span>
              <BsPersonCircle />
            </H1Span>
            Sign Up
          </H1>
          <Input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={user.firstname}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Sign Up</Button>
          <Text>
            Already have an account. <Link to="/signin">Sign In</Link>
          </Text>
        </Form>
      </Container>
    </>
  );
};

export default Register;
