import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
// import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Logo from "./icons/Logo";
import Contact from "./components/Contact";
import Information from "./components/Information";
import AcceptTerms from "./components/sendEmail/AcceptTerms";
import SendEmail from "./components/sendEmail/SendEmail";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";
import EditProfile from "./components/EditProfile";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showMyGrades, setShowMyGrades] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_EMPLOYEE"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowMyGrades(currentUser.roles.includes("ROLE_STUDENT"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setShowMyGrades(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand menu">
          <Link to={"/"} className="navbar-brand">
            <Logo />
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/contact"} className="nav-link">
                Kontakt
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/information"} className="nav-link">
                Informacje o kierunkach
              </Link>
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/employee"} className="nav-link">
                  Panel pracownika
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Panel admina
                </Link>
              </li>
            )}

            {showMyGrades && (
              <li className="nav-item">
                <Link to={"/myGrades"} className="nav-link">
                  Moje oceny końcowe
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Witaj, {currentUser.name}
                </Link>
              </li>
              <li className="logoutsign">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Wyloguj się
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="logoutsign">
                <Link to={"/login"} className="nav-link">
                  Zaloguj się
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/register" component={Register} /> */}
            <Route exact path="/profile" component={Profile} />
            <Route path="/contact" component={Contact} />
            <Route path="/information" component={Information} />
            <Route exact path="/myGrades" component={BoardUser} />
            <Route path="/employee" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/edit" component={EditProfile} />
            <Route path="/accept" component={AcceptTerms} />
            <Route path="/sendemail" component={SendEmail} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
