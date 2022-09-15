import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import axios from "axios";
import dotenv from "dotenv";
import { Config } from "./config";
// dotenv.config();
// console.log(process.env.REACT_APP_API_SERVER_URL);
// const { REACT_APP_API_SERVER_URL } = process.env;
// console.log(REACT_APP_API_SERVER_URL);

// axios.defaults.baseURL = Config();
// axios.defaults.baseURL = "http://localhost:3005";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
