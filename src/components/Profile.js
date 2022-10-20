import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
const MainDiv = styled.div`
  p {
    margin: 10px;
  }
  div {
    margin: 2px;
  }
  button {
    display: inline-block;
    padding: px 25px;
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
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  margin: 10px;
  padding: 5px;
`;

const Infomation = styled.div`
  padding: 20px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Profile = () => {
  const history = useHistory();
  //pobranie konkretnego uzytkownika, ktory jest zalogowany
  const { user: currentUser } = useSelector((state) => state.auth);
  // console.log(currentUser);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  // const noRefresh = (e) => {
  //   e.preventDefault();
  // }
  //PROFIL STUDENTA
  if (currentUser.isStudent) {
    return (
      <MainDiv>
        <h4>Konto studenta:</h4> <strong>{currentUser.username}</strong>
        <p>Informacje o studencie: </p>
        <Infomation>
          <div>Imię: {currentUser.name}</div>
          <div>Nazwisko: {currentUser.surname}</div>
          <div>
            Adres zamieszkania:{" "}
            {currentUser.address
              ? currentUser.address
              : "Brak podanego adresu, uzupełnij dane"}
          </div>
          <div>Numer indeksu: {currentUser.indexNumber !== null ? currentUser.indexNumber : "brak indeksu"}</div>
          <div>Data urodzenia: {currentUser.birthDate}</div>
          <div>Numer telefonu: {currentUser.phone !== null ? currentUser.phone : "brak podanego numeru"}</div>
          <div>Aktualny semestr: {currentUser.semestr}</div>
        </Infomation>
        <button onClick={() => history.push("/edit")}>Edytuj profil</button>
      </MainDiv>
    );

    //PROFIL ADMINA
  } else if (currentUser.roles.toString() === "ROLE_ADMIN") {
    return (
      <MainDiv>
        <h1>Konto admina</h1> <strong>{currentUser.name}</strong>
        {/* {currentUser.roles.toString()} */}
        {/* <button><a href="/edit">Edytuj profil</a></button> */}
        <a href="/edit">
          <button>Edytuj profil</button>
        </a>
      </MainDiv>
    );

    //PROFIL PRACOWNIKA
  } else if (currentUser.roles.toString() === "ROLE_EMPLOYEE") {
    return (
      <MainDiv>
        <h1>Konto pracownika</h1> <strong>{currentUser.name}</strong>
        <a href="/edit">
          <button>Edytuj profil</button>
        </a>
        {/* {currentUser.roles.toString()} */}
      </MainDiv>
    );
  }
};

export default Profile;
