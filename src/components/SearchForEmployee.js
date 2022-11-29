import React from "react";
import { useEffect, useState} from "react";
import axios from "axios";
import { createEntityAdapter } from "@reduxjs/toolkit";
import styled from "styled-components";
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const Table = styled.table`
  width: 200px;
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
const SearchForEmployee = () => {
    const [data, setData] = useState();
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        const baseUrl = "http://localhost:8080";
        const url = baseUrl + "/sendEmployeeList/";
        axios
          .get(url)
          .then((res) => {
            if (res.data.success) {
              const data = res.data.data;
            //   console.log(data);
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

    const searchEmployee = data?.filter((dat) => {
        console.log(dat)
        console.log('dat',dat.surname)
        if(!searchValue){
            return dat;
        } else if(dat?.surname?.toLowerCase().includes(searchValue.toLowerCase())) {
            return dat;
        }
        return null;
    }).map((dat) => {
        return(
                <tr>
                    <td>{dat.name}</td>
                    <td>{dat.surname}</td>
                    <td>{dat.title != null ? dat.title : "Brak tytułu"}</td>
                    <td>{dat.email != null ? dat.email : "Brak emailu"}</td>
                    <td>{dat.phone != null ? dat.phone : "Brak numeru telefonu"}</td>
                </tr>
        )
    })

    // console.log("eeee", searchEmployee);

    const handleInput = (e) => {
        // console.log(e.target.value)
        setSearchValue(e.target.value);
    }
    return(
    <Wrapper>
        <h1>Wyszukaj pracownika po nazwisku</h1><br/>
        <input onChange={handleInput}></input><br/>
        <Table>
          {searchValue.length !== 0 ?(
          <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Tytuł</th>
                    <th>Email</th>
                    <th>Numer telefonu</th>
          </tr>) : null}
          {searchValue && searchEmployee}
        </Table>
    </Wrapper>)
}

export default SearchForEmployee;