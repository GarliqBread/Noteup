import { getRecoil } from "recoil-nexus";

import { tokenSelector } from "@/recoil/auth.recoil";

export const useAuth = () => {
  const isAuthenticated = !!getRecoil(tokenSelector);

  return { isAuthenticated };
};
