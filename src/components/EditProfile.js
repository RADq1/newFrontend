import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
// import { useEffect } from "react";
const Button = styled.button`
width: 20%;
height: 5%;
padding: 10px;
margin-top: 20px;
margin-left: 0px;
margin-bottom: 20px;
font-size: 16px;
`
const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: baseline;
justify-content: space-between;
`
const TextArea = styled.input`
width: 70%;
height: 40px;
::placeholder{
  margin: 5px
}
&:input:focus {
        outline: none;
        box-shadow: 0px 0px 2px red;
    }
/* border-radius: 4px; */
`
const EditProfile = () => {
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  // const [actualPassword, setActualPassword] = useState("");
  //sprawdzenie, czy uzytkownik jest zalogowany
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const sendSurname = () => {
    const baseUrl = "http://localhost:8080/edit/surname";
    console.log(surname);
    if (surname === "") {
      return alert("Puste pole");
    } else
      try {
        axios
          .post(baseUrl, {
            id: currentUser.id,
            surname: surname,
          })
          .then((res) => console.log(res));
      } catch (e) {
        console.log(e);
      }
  };

  const sendAddress = () => {
    const baseUrl = "http://localhost:8080/edit/address";
    console.log(address);
    if (address === "") {
      return alert("Puste pole");
    } else
      try {
        axios
          .post(baseUrl, {
            id: currentUser.id,
            address: address,
          })
          .then((res) => console.log(res));
      } catch (e) {
        console.log(e);
      }
  };
  const sendPassword = () => {
    const baseUrl = "http://localhost:8080/edit/password";
    console.log(password);
    if (password === "") {
      return alert("Puste pole");
    } else
      try {
        axios
          .post(baseUrl, {
            id: currentUser.id,
            password: password,
          })
          .then((res) => console.log(res));
      } catch (e) {
        console.log(e);
      }
  };

  return (
    <div>
      <h1>Edycja profilu <h5>{currentUser.name} {currentUser.surname}</h5></h1>
      {/* Id użytkownika: {currentUser.id} */}
      {/* <button onClick={changeName}>Zmień nazwisko</button> */}
      <label>Zmień nazwisko</label>
        <form autoComplete="off">
        <Wrapper>
        <TextArea
          type="text"
          placeholder={currentUser.surname}
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <Button type="submit" onClick={sendSurname}>
          Aktualizuj nazwisko
        </Button>
        </Wrapper>
        </form>


      <label>Zmień adres</label>
      <form autoComplete="off">
      <Wrapper>
        <TextArea
          autoComplete="none"
          type="text"
          class="form-control"
          placeholder={
            currentUser.address
              ? currentUser.address
              : "Brak adresu, uzupełnij dane"
          }
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      <Button type="submit" onClick={sendAddress}>
        Aktualizuj adres
      </Button>
      </Wrapper>
      </form>


      <label>Zmień hasło: </label>
      <form autoComplete="off">
      <Wrapper>
        <TextArea
          autoComplete="none"
          type="password"
          class="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={sendPassword}>
          Aktualizuj hasło
        </Button>
        </Wrapper>
        </form>

      <p>*wszystkie dane zostaną zaaktualizowane po ponownym zalogowaniu*</p>
    </div>
  );
};

export default EditProfile;
