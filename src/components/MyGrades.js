import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-size: 40px;
  padding-bottom: 50px;
  /* &:hover {
    color: red;
  } */
`;
const Two = styled.p`
  margin: 0;
  color: red;
`;
const Table = styled.table`
  th,
  td {
    text-align: center;
    padding: 15px;
    border: 1px solid black;
  }
  th {
    color: rgb(220, 40, 40);
  }
`;
const SendGrades = styled.button`
  display: flex;
  /* gap: 5px; */
  width: 30%;
  height: 20px;
  align-items: center;

  div {
    width: 50px;
    height: 100px;
    background-color: blue;
    margin: 5px;
  }
`;
const MyGrades = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [data, setData] = useState();
  console.log(currentUser.id);
  console.log(data);
  useEffect(() => {
    const baseUrl = "http://localhost:8080";
    const url = baseUrl + "/showGrades/" + currentUser.id;
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          setData(data);
          if (!data) return;
        } else {
          alert("Bład");
        }
      })
      .catch((error) => {
        alert("Błąd po stronie serwera" + error);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <Wrapper>
      <Title>Lista ocen studenta {currentUser.name}</Title>
      {/* ? sprawdzanie, czy istnieje */}
      <Table>
        <tr>
          <th>Nazwa przedmiotu</th>
          <th>Ocena</th>
          <th>Liczba punktów ECTS</th>
        </tr>
        {data?.map((dat) => (
          <tr>
            <td>{dat.Lesson.name}</td>
            <td>{dat.grade === 2 ? <Two>{dat.grade}</Two> : dat.grade}</td>
            <td>{dat.Lesson.numberOfECTS}</td>
          </tr>
        ))}
      </Table>
      <SendGrades
        onClick={() => {
          console.log("Działa");
        }}
      >
        Wyślij oceny firmie
      </SendGrades>
    </Wrapper>
  );
};

export default MyGrades;
