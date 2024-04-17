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

const token = localStorage.getItem("token");

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
              <Navigate replace to={`${token ? "/dashboard" : "/login"}`} />
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='dashboard' element={<Dashboard />} />
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
