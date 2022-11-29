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

const Button = styled.button`
display: flex;
flex-direction: row;
/* text-align: left; */
width: 50%;
margin-top: 10%;
padding: 5px;
`
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
        <br/>
        <p>Dane osobowe oraz informacje o studencie: </p>
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
        <Button onClick={() => history.push("/edit")}>Edytuj profil</Button>
      </MainDiv>
    );

    //PROFIL ADMINA
  } else if (currentUser.roles.toString() === "ROLE_ADMIN") {
    return (
      <MainDiv>
        <h1>Konto admina</h1>
        <br/>
        <p>Dane osobowe oraz informacje o adminie: </p>
        <Infomation>
          <div>Imię: {currentUser.name}</div>
          <div>Nazwisko: {currentUser.surname}</div>
          <div>
            Adres zamieszkania:{" "}
            {currentUser.address
              ? currentUser.address
              : "Brak podanego adresu, uzupełnij dane"}
          </div>
          <div>Data urodzenia: {currentUser.birthDate}</div>
          <div>Numer telefonu: {currentUser.phone !== null ? currentUser.phone : "brak podanego numeru"}</div>
        </Infomation>
        {/* {currentUser.roles.toString()} */}
        {/* <button><a href="/edit">Edytuj profil</a></button> */}
        <Button onClick={() => history.push("/edit")}>Edytuj profil</Button>
      </MainDiv>
    );

    //PROFIL PRACOWNIKA
  } else if (currentUser.roles.toString() === "ROLE_EMPLOYEE") {
    return (
      <MainDiv>
        <h1>Konto pracownika</h1> {currentUser.title} {currentUser.name} {currentUser.surname}
        <br/>
        <p>Dane osobowe oraz informacje o pracowniku: </p>
        <Infomation>
          <div>
            Adres zamieszkania:{" "}
            {currentUser.address
              ? currentUser.address
              : "Brak podanego adresu, uzupełnij dane"}
          </div>
          <div>Data urodzenia: {currentUser.birthDate}</div>
          <div>Numer telefonu: {currentUser.phone !== null ? currentUser.phone : "brak podanego numeru"}</div>
        </Infomation>
        <Button onClick={() => history.push("/edit")}>Edytuj profil</Button>
        {/* {currentUser.roles.toString()} */}
      </MainDiv>
    );
  }
};

export default Profile;
