import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const checkLogin = (path) => {
    const token = localStorage.getItem("accessToken");
    const verifyEmail = localStorage.getItem("verifyEmail");
    if (token) {
      updateUserToken(token);
      navigate(path || "/garden/registration");
      return;
    }
    if (verifyEmail) {
      navigate("/email-verification");
      return;
    }
    updateUserToken("");
    console.log("path", path);
    if (!path) {
      navigate("/login");
    }

    // navigate("/login");
  };

  const getUserData = () => {
    if (userData) {
      return userData;
    }
    const user = localStorage.getItem('currentUser');
    console.log('user', user);
    return user;
  };

  const updateUserData = (info) => {
    setUserData(info);
  };

  const updateUserToken = (info) => {
    setUserToken(info);
  };

  const updateUserEmail = (info) => {
    setUserEmail(info);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        userToken,
        userEmail,
        updateUserToken,
        updateUserData,
        checkLogin,
        updateUserEmail,
        getUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
