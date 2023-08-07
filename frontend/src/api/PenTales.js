import axios from "axios";

// Axios instance
const PenTalesApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default PenTalesApi;
