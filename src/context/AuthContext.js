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
      navigate("/dashboard");
      return;
    }
    if (verifyEmail) {
      navigate("/email-verification");
      return;
    }
    updateUserToken("");
    if (path) {
      navigate(path);
    }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
