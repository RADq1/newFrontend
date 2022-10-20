import React, { useState, useEffect} from "react";
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
const Information = () => {
    const [fieldOfStudiesList, setFieldOfStudiesList] = useState(null)
    useEffect(() => {
        const baseUrl = "http://localhost:8080";
        const url = baseUrl + "/information/";
        axios
          .get(url)
          .then((res) => {
            if (res.data.success) {
              const data = res.data.data;
              console.log(data);
              setFieldOfStudiesList(data);
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
        <h2>Lista wszystkich kierunków danego wydziału:</h2>
        <br/>
        <Table>
                <tr>
                    <th>Nazwa wydziału</th>
                    <th>Nazwa kierunku</th>
                    <th>Opis</th>
                </tr>
                {fieldOfStudiesList?.map((data) => (
                <tr>
                    <td>{data.name}</td>
                    <td>{data.fieldofstudy.name}</td>
                    <td>{data.fieldofstudy.description}</td>
                </tr>))}
            </Table>
    </Wrapper>
        );
}

export default Information;