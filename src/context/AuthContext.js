import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const checkLogin = (path) => {
    const token = localStorage.getItem("token");
    if (token) {
      updateUserToken(token);
      navigate("/dashboard");
      return
    }
    updateUserToken('');
    navigate(path);
  };

  const updateUserData = (info) => {
    setUserData(userData);
  };

  const updateUserToken = (info) => {
    setUserToken(userData);
  };

  return (
    <AuthContext.Provider
      value={{ userData, userToken, updateUserToken, updateUserData, checkLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
