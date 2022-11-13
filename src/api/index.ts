import axios from "axios";
import { getRecoil, setRecoil } from "recoil-nexus";

import { authState } from "@/recoil/auth.recoil";

import { authQueries } from "./authQueries";

const API_URL = "http://localhost:8000/api";
const instance = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

instance.interceptors.request.use(
  async (config) => {
    const token = getRecoil(authState).token;
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      setRecoil(authState, {
        ...getRecoil(authState),
        token: undefined,
      });
    } else {
      return response.data.data || response.data || response;
    }
  },
  (error) => {
    if (error.response.data.code === "token_not_valid") {
      authQueries.refreshToken();
    }
    throw error.response?.data;
  },
);

export { instance };
