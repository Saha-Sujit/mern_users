import React, { useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";

const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  @media only screen and (max-width: 768px) {
    padding: 20px;
  }
`;
const H1 = styled.h1``;
const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;
const TR = styled.tr`
  &:nth-child(even) {
    background-color: #b2d9f7;
  }
`;
const TH = styled.th`
  border: 1px solid #b2d9f7;
  text-align: left;
  padding: 8px;
`;
const TD = styled.td`
  border: 1px solid #b2d9f7;
  text-align: left;
  padding: 8px;
`;

const LocalData = () => {
  const localdata = JSON.parse(localStorage.getItem("localUsers"));
  console.log(localdata);
  return (
    <>
      <Container>
        <H1>Local Storage</H1>
        <Table>
          <TR>
            <TH>No.</TH>
            <TH>Name</TH>
            <TH>Age</TH>
            <TH>City</TH>
          </TR>
          {localdata.map((localdat, index) => (
            <>
              <TR key={index}>
                <TD>{localdat.id}</TD>
                <TD>{localdat.name}</TD>
                <TD>{localdat.age}</TD>
                <TD>{localdat.city}</TD>
              </TR>
            </>
          ))}
        </Table>
        <Logout />
      </Container>
    </>
  );
};

export default LocalData;
