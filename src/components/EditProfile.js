import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const EditProfile = () => {
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [actualPassword, setActualPassword] = useState("");
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
      Edycja profilu: {currentUser.name}
      <br />
      Id użytkownika: {currentUser.id}
      {/* <button onClick={changeName}>Zmień nazwisko</button> */}
      <label>Zmień nazwisko</label>
      <input
        type="text"
        class="form-control"
        placeholder={currentUser.surname}
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <button type="submit" class="btn btn-primary" onClick={sendSurname}>
        Aktualizuj nazwisko
      </button>
      <div>
        <label>Zmień adres</label>
        <input
          autocomplete="false"
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
      </div>
      <button type="submit" class="btn btn-primary" onClick={sendAddress}>
        Aktualizuj adres
      </button>
      <div></div>
      <label>Zmień hasło: </label>
      <form autocomplete="off">
        <input
          autocomplete="false"
          type="password"
          class="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" class="btn btn-primary" onClick={sendPassword}>
          Aktualizuj hasło
        </button>
      </form>
      <p>*wszystkie dane zostaną zaaktualizowane po ponownym zalogowaniu*</p>
    </div>
  );
};

export default EditProfile;
