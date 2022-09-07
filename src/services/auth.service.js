import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const createStudent = (name, surname, username, email, password, indexNumber, birthDate, isStudent) => {
  return axios.post(API_URL + "createStudent", {
    name,
    surname,
    username,
    email,
    password,
    indexNumber,
    birthDate,
    isStudent,
  });
};

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  createStudent,
  register,
  login,
  logout,
};

export default authService;
