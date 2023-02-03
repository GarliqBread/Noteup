import { getRecoil, setRecoil } from "recoil-nexus";

import { authState } from "@/recoil/auth.recoil";

import { instance } from ".";

export const authQueries = {
  async login({ username, password }: { username: string; password: string }): Promise<void> {
    const response = await instance.post("/token/", {
      username,
      password,
    });
    const result = response.data || response;
    setRecoil(authState, {
      ...getRecoil(authState),
      token: result.access,
      refreshToken: result.refresh,
    });
  },
  async refreshToken(): Promise<void> {
    const refresh = getRecoil(authState).refreshToken;
    const response = await instance.post("/token/refresh/", {
      refresh,
    });
    const result = response.data || response;
    setRecoil(authState, {
      ...getRecoil(authState),
      token: result.access,
    });
  },
};
