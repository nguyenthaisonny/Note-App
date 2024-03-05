/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      if (user?.accessToken) {
        setUser(user);
        //fix 403 forbidden because loader funtions of router run independence and earlier
        if (user.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", user.accessToken);
          window.location.reload();
        }
        setIsLoading(false);
        return;
      }
      setUser({});
      localStorage.clear();
      setIsLoading(false);
      navigate("/Login");
      return () => {
        unsubcribed();
      };
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}
