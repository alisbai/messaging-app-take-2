import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = Axios.create({
  // baseURL: "http://localhost:8005",
  baseURL: "http://localhost:8005", // Local IP Address when using an external device
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
