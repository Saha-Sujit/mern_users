import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 50px;
`;
const BUTTON = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 7px;
  background-color: black;
  color: white;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #222;
  }
  @media only screen and (max-width: 768px) {
    padding: 7px 10px;
  }
`;

const Save = styled.div`
  border: 1px solid #b2d9f7;
  text-align: left;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    /* align-items: flex-start; */
    gap: 10px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const SortContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const LimitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Para = styled.p`
  font-size: 14px;
  font-weight: 600;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const SEARCH = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid #999;
  @media only screen and (max-width: 768px) {
    padding: 5px;
    font-size: 12px;
  }
`;
const SORT = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #999;
  @media only screen and (max-width: 768px) {
    padding: 5px;
    font-size: 12px;
  }
`;
const SortBy = styled.option`
  padding: 10px;
  font-size: 16px;
  @media only screen and (max-width: 768px) {
    padding: 5px;
    font-size: 12px;
  }
`;
const LIMIT = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #999;
  @media only screen and (max-width: 768px) {
    padding: 5px;
    font-size: 12px;
  }
`;
const SetLimits = styled.option`
  padding: 10px;
  font-size: 16px;
  @media only screen and (max-width: 768px) {
    padding: 5px;
    font-size: 12px;
  }
`;

const Home = () => {
  const [fetchData, setFetchData] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [localData, setLocalData] = useState({
    id: "",
    name: "",
    age: "",
    city: "",
  });
  useEffect(() => {
    const baseUrl = `http://localhost:9002/allusers?page=${page}&search=${search}&sort=${sort}&limit=${limit}`;
    axios.get(baseUrl).then((response) => {
      setFetchData(response.data.allusers);
      setTotal(response.data.total);
      setPage(response.data.page);
      setLimit(response.data.limit);
    });
  }, [page, search, sort, limit]);

  const handlePrev = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page * limit !== total && !(total < limit)) {
      setPage(page + 1);
    }
  };

  const handleSorting = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };

  const handleLimits = (e) => {
    e.preventDefault();
    setLimit(e.target.value);
  };

  return (
    <>
      <Container>
        <H1>All Users</H1>
        <TopContainer>
          <SearchContainer>
            <Para>Search: </Para>
            <SEARCH
              type="text"
              placeholder="search name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></SEARCH>
          </SearchContainer>
          <SortContainer>
            <Para>Sort By: </Para>
            <SORT onChange={handleSorting}>
              <SortBy value="id">Id</SortBy>
              <SortBy value="name">Name</SortBy>
              <SortBy value="age">Age</SortBy>
              <SortBy value="city">City</SortBy>
            </SORT>
          </SortContainer>
          <LimitContainer>
            <Para>Limit: </Para>
            <LIMIT onChange={handleLimits}>
              <SetLimits value="10">10</SetLimits>
              <SetLimits value="20">20</SetLimits>
              <SetLimits value="30">30</SetLimits>
              <SetLimits value="40">40</SetLimits>
              <SetLimits value="50">50</SetLimits>
            </LIMIT>
          </LimitContainer>
        </TopContainer>
        <Table>
          <TR>
            <TH>No.</TH>
            <TH>Name</TH>
            <TH>Age</TH>
            <TH>City</TH>
            <TH>Save</TH>
          </TR>
          {fetchData.map((fetchdata, index) => (
            <>
              <TR key={index}>
                <TD>{fetchdata.id}</TD>
                <TD>{fetchdata.name}</TD>
                <TD>{fetchdata.age}</TD>
                <TD>{fetchdata.city}</TD>
                <Save
                  onClick={() => {
                    setLocalData({
                      id: fetchdata.id,
                      name: fetchdata.name,
                      age: fetchdata.age,
                      city: fetchdata.city,
                    });
                    const localStorageItems =
                      JSON.parse(localStorage.getItem("localUsers")) || [];
                    localStorage.setItem(
                      "localUsers",
                      JSON.stringify([...localStorageItems, localData])
                    );
                  }}
                >
                  Save
                </Save>
              </TR>
            </>
          ))}
        </Table>
        <ButtonContainer>
          <BUTTON onClick={handlePrev}>Previous Page</BUTTON>
          <BUTTON onClick={handleNext}>Next Page</BUTTON>
        </ButtonContainer>
        <Logout />
      </Container>
    </>
  );
};

export default Home;
