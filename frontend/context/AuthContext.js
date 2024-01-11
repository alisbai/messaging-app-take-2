import { createContext, useEffect, useState } from "react";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appLoading, setAppLoading] = useState(false);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setAppLoading(true);
    try {
      const response = await api.get("api/v1/users/me");
      setUser(response.data);
      setAppLoading(false);
    } catch (error) {
      console.log(error);
      setUser(null);
      setAppLoading(false);
    }
  };

  const authenticate = async ({ setErrors, action, ...props }) => {
    setIsLoading(true);
    await delay(1000);
    const endpoint =
      action === "login" ? "api/v1/auth/login" : "api/v1/auth/signup";
    try {
      const response = await api.post(endpoint, props);
      await AsyncStorage.setItem("token", response.data.token);
      setIsLoading(false);
      getUser();
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, appLoading, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
