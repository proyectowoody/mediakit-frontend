import axios from "axios";
import { linkBackend } from "./url";

const api = axios.create({
  baseURL: `${linkBackend}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
