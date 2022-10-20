import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import StudentList from "./employeePanel/StudentList";
import EmployeePanel from "./employeePanel/EmployeePanel";
import AddGrades from "./employeePanel/AddGrades";
import { useSelector } from "react-redux";
import AssignedLessons from "./employeePanel/AssignedLessons";
import EditGrades from "./employeePanel/EditGrades";
import GoogleCalendar from "./employeePanel/GoogleCalendar";
import ChangeGrades from "./employeePanel/ChangeGrades";

const BoardModerator = () => {
  const [content, setContent] = useState("");
  const [number, setNumber] = useState(0);
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data)
        switch(number)
        {
          case 0: setContent(<EmployeePanel setNumber={setNumber} currentUser={currentUser}/>)
          break;
          case 1: setContent(<StudentList setNumber={setNumber} currentUser={currentUser}/>)
          break;
          case 2: setContent(<EditGrades setNumber={setNumber} currentUser={currentUser}/>)
          break;
          case 3: setContent(<AssignedLessons setNumber={setNumber} currentUser={currentUser}/>)
          break;
          case 5: setContent(<AddGrades setNumber={setNumber} currentUser={currentUser}/>)
          break;
          case 6: setContent(<ChangeGrades setNumber={setNumber} currentUser={currentUser}/>)
          break;
          default: setContent(<EmployeePanel setNumber={setNumber} currentUser={currentUser}/>)
        }
        ;
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
  }, [number, currentUser]);

  return (
    <div>
      <header>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardModerator;
