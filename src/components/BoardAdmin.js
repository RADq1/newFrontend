import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AdminPanel from "./adminPanel/AdminPanel";
import CreateStudent from "./adminPanel/CreateStudent";
import ListOfGrades from "./adminPanel/ListOfGrades";
import CreateEmployee from "./adminPanel/CreateEmployee";
import CreateLessons from "./adminPanel/CreateLessons";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  // const [showComponent, setShowComponent] = useState(false);
  const [number, setNumber] = useState(0);
  // const hide = () => {
  //   setShowComponent(!showComponent);
  //   console.log(showComponent)
  // }
  // console.log(showComponent)
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
        // console.log(number);
        // setNumber(1);
        // console.log(number);
        switch(number)
        {
          case 0: setContent(<AdminPanel setNumber={setNumber}/>)
          break;
          case 1: setContent(<CreateStudent setNumber={setNumber}/>)
          break;
          case 2: setContent(<CreateEmployee setNumber={setNumber}/>)
          break;
          case 3: setContent(<CreateLessons setNumber={setNumber}/>)
          break;
          case 4: setContent(<ListOfGrades setNumber={setNumber}/>)
          break;
          default: setContent(<AdminPanel setNumber={setNumber}/>)
        }

        // if(showComponent){
        //   setContent(<CreateStudent setShowComponent={setShowComponent}/>)
        // } else {
        //   setContent(<AdminPanel setShowComponent={setShowComponent}/>)
        // }
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
  }, [number]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardAdmin;
