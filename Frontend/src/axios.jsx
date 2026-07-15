import axios from "../axios.jsx";

// 1. Get the Render URL from Vercel's environment variables, 
//    or default to localhost when running on your computer.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// 2. Create the Axios instance with the dynamic URL (appending "/api")
const API = axios.create({
  baseURL: `${API_BASE_URL}/api`, 
});

export default API;