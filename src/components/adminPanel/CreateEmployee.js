import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createEmployee } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

const CreateEmployee = ({setNumber}) => {
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
      }, [dispatch]);
      const initialValues = {
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        birthDate: Date.parse(),
        phone: 1,
        title: "",
      };
      const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("To pole jest obowiazkowe!"),
        surname: Yup.string()
            .required("To pole jest obowiazkowe!"),
        username: Yup.string()
          .test(
            "len",
            "Login musi mieć pomiędzy 3, a 20 znaków.",
            (val) =>
              val &&
              val.toString().length >= 3 &&
              val.toString().length <= 20
          )
          .required("To pole jest obowiazkowe!"),
        email: Yup.string()
          .email("Wprowadź poprawny e-mail.")
          .required("To pole jest obowiazkowe!"),
        password: Yup.string()
          .test(
            "len",
            "Hasło musi mieć pomiędzy 6, a 40 znaków.",
            (val) =>
              val &&
              val.toString().length >= 6 &&
              val.toString().length <= 40
          )
          .required("This field is required!"),
        birthDate: Yup.date()
            .required("Pole obowiązkowe"),
        phone: Yup.number()
            .test(
                "len",
                "Numer telefonu musi zawierac 9 cyfr",
                (val) =>
                // val &&
                val.toString().length === 9
            )
            .required("Pole obowiązkowe"),
        title: Yup.string()
            .required("To pole jest obowiazkowe!"),
      });
      const handleRegister = (formValue) => {
        const { name, surname, username, email, password, birthDate, phone, title } = formValue;
        setSuccessful(false);
        dispatch(createEmployee({ name, surname, username, email, password, birthDate, phone, title}))
          .unwrap()
          .then(() => {
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          });
      };
    return(
        <div>
        <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Imię</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="surname">Nazwisko</label>
                  <Field name="surname" type="text" className="form-control" />
                  <ErrorMessage
                    name="surname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Login</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Data urodzenia</label>
                  <Field name="birthDate" type="date" className="form-control" />
                  <ErrorMessage
                    name="birthDate"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Numer telefonu</label>
                  <Field name="phone" type="number" className="form-control" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="title">Tytuł</label>
                  <Field name="title" type="text" className="form-control" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit">Stwórz pracownika!</button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
            <button onClick={() => setNumber(0)}>Wróć</button>
        </div>
    );
}

export default CreateEmployee;