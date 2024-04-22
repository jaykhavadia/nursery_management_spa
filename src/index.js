import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/Signup";
import axios from "axios";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import EmailVerification from "./components/EmailVerification/EmailVerification";
import "./assets/style/style.css";
import "./assets/scss/bootstrap.scss";
import "./assets/style/bootstrap.min.css";
import $ from 'jquery';
// import the library
import { library } from "@fortawesome/fontawesome-svg-core";

// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Home from "./components/Home/Home";

import "animate.css/animate.min.css";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

const token = localStorage.getItem("accessToken");

axios.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <div>
        <Routes>
          <Route
            path='*'
            element={
              <Navigate replace to={`${token ? "/dashboard" : "/home"}`} />
            }
          />
          <Route path='home' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='projects' element={<Projects />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='email-verification' element={<EmailVerification />} />
          {/* <Route path='contact' element={<Contact />} /> */}
        </Routes>
        <Toaster
          position='top-right'
          reverseOrder={false}
          toastOptions={{ duration: 3000 }}
        />
      </div>
    </AuthContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
library.add(fab, fas, far);
