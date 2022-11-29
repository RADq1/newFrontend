import React from "react";
import { useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
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
const StudentList = ({ setNumber }) => {
    const [data, setData] = useState();
    useEffect(() => {
        const baseUrl = "http://localhost:8080";
        const url = baseUrl + "/showStudentList/";
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

    return(
        <Wrapper>
          <br/>
            <p>Lista wszystkich studentów:</p>
            <br/>
            <Table>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Numer indeksu</th>
                    <th>Kierunek studiów</th>
                </tr>
            {data?.map(({ name, surname, indexNumber, fieldofstudy}) => (
                <tr>
                    <td>{name}</td>
                    <td>{surname}</td>
                    <td>{indexNumber != null ? indexNumber : "Brak indeksu"}</td>
                    <td>{fieldofstudy != null ? fieldofstudy.name : "Brak kierunku"}</td>
                </tr>
        ))}
            </Table>
            <button onClick={() => setNumber(0)}>Wróć</button>
        </Wrapper>
    );
}

export default StudentList;