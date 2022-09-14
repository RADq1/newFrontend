import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "../css/studentProfile.css";

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
      <div className="studentProfile">
        Konto studenta: <strong>{currentUser.username}</strong>
        <br />
        {/* <p>Zdjęcie użytkownika:</p>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}
        <p>Informacje o studencie: </p>
        Imię: {currentUser.name}
        <br />
        Nazwisko: {currentUser.surname}
        <br />
        Adres zamieszkania:{" "}
        {currentUser.address
          ? currentUser.address
          : "Brak podanego adresu, uzupełnij dane"}
        <br />
        Numer indeksu: {currentUser.indexNumber}
        <br />
        Data urodzenia: {currentUser.birthDate}
        <br />
        <button onClick={() => history.push("/edit")}>Edytuj profil</button>
      </div>
    );

    //PROFIL ADMINA
  } else if (currentUser.roles.toString() === "ROLE_ADMIN") {
    return (
      <div>
        Konto admina <strong>{currentUser.name}</strong>
        {/* {currentUser.roles.toString()} */}
        {/* <button><a href="/edit">Edytuj profil</a></button> */}
        <a href="/edit">
          <button>Edytuj profil</button>
        </a>
      </div>
    );

    //PROFIL PRACOWNIKA
  } else if (currentUser.roles.toString() === "ROLE_EMPLOYEE") {
    return (
      <div>
        Konto pracownika <strong>{currentUser.name}</strong>
        <p>Zdjęcie użytkownika:</p>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <a href="/edit">
          <button>Edytuj profil</button>
        </a>
        {/* {currentUser.roles.toString()} */}
      </div>
    );
  }
};

export default Profile;
