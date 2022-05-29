import axios from "axios";

const API_URL = "http://localhost:5000/index.php/";

const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};
const getCurrentUser = () => {
  const user = localStorage.getItem("user")
  return JSON.parse(user || "");
};
const AuthService = {
  login,
  logout,
  getCurrentUser,
}
export default AuthService;
