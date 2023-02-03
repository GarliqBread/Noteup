import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { AuthState } from "./types";

const { persistAtom } = recoilPersist();

export const authState: RecoilState<AuthState> = atom({
  key: "auth-state",
  default: {
    token: undefined,
    refreshToken: undefined,
    username: undefined,
    apiURL: import.meta.env.VITE_API_URL,
  },
  effects_UNSTABLE: [persistAtom],
});

export const tokenSelector = selector({
  key: "token-selector",
  get: ({ get }) => get(authState).token,
  set: ({ get, set }, token) =>
    !(token instanceof DefaultValue) &&
    set(authState, {
      ...get(authState),
      token,
    }),
});

export const refreshTokenSelector = selector({
  key: "refresh-token-selector",
  get: ({ get }) => get(authState).refreshToken,
  set: ({ get, set }, refreshToken) =>
    !(refreshToken instanceof DefaultValue) &&
    set(authState, {
      ...get(authState),
      refreshToken,
    }),
});

export const apiURLSelector = selector({
  key: "api-url-selector",
  get: ({ get }) => get(authState).apiURL,
  set: ({ get, set }, apiURL) =>
    !(apiURL instanceof DefaultValue) &&
    set(authState, {
      ...get(authState),
      apiURL,
    }),
});
