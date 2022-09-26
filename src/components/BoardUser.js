import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import MyGrades from "./MyGrades";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        //setContent(response.data);
        //Ustawienie tego, co ma sie wyswietlic dla zalogowanego uzytkownika
        setContent(<MyGrades />);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <div>
        <h3>{content}</h3>
      </div>
    </div>
  );
};

export default BoardUser;
