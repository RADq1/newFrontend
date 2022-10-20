import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-size: 40px;
  padding: 40px;
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
    /* color: rgb(220, 40, 40); */
    font-style: bold;
  }
`;
const SendGrades = styled.button`
  display: inline-block;
  padding: 25px 25px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #830e21;
  border: none;
  border-radius: 7px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  transition: 0.2s;
  &:hover {
    background-color: #fff;
    color: #830e21;
  }
`;
const MyGrades = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [data, setData] = useState();
  const history = useHistory();
  // console.log(currentUser.id);
  // console.log(data);
  useEffect(() => {
    const baseUrl = "http://localhost:8080";
    const url = baseUrl + "/showGrades/" + currentUser.id;
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          // console.log(data);
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
          <th>Semestr</th>
          <th>Forma zajęć</th>
        </tr>
        {/* {console.log(data?.sort(data.Lesson.semestr))} */}

        {data?.sort((a, b) => a.Lesson.semestr - b.Lesson.semestr).map(({ Lesson, grade }) => (
          <tr>
            <td>{Lesson.name}</td>
            {/* <td>{grade === 2 ? <Two>{grade}</Two> : grade}</td> */}
            <td>{grade !== null ? (grade === 2 ? <Two>{grade}</Two> : grade) : "(brak ocen)"}</td>
            {/* <td>{if(grade === 2)}</td> */}
            <td>{Lesson.numberOfECTS}</td>
            <td>{Lesson.semestr}</td>
            <td>{Lesson.type}</td>
          </tr>
        ))}
      </Table>
      <SendGrades
        onClick={() => {
          history.push("/accept");
        }}
      >
        Wyślij oceny firmie
      </SendGrades>
    </Wrapper>
  );
};

export default MyGrades;
