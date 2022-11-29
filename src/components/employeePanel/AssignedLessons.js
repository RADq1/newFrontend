import { useEffect, useState } from "react";
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
const AssignedLesson = ({ setNumber, currentUser }) => {
    const [data, setData] = useState();
    useEffect(() => {
        const baseUrl = "http://localhost:8080";
        const url = baseUrl + "/showAssignedLessons/" + currentUser.id;
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
            <p>Przypisane zajęcia dla {currentUser.title} {currentUser.name}</p>
            <Table>
                <tr>
                    <th>Nazwa przedmiotu</th>
                    <th>Rodzaj</th>
                    <th>Semestr</th>
                </tr>
                {data?.map((data) => (
                <tr>
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                    <td>{data.semestr}</td>
                </tr>))}
            </Table>
            <button onClick={() => setNumber(0)}>Wróć</button>
        </Wrapper>
    );
}

export default AssignedLesson;