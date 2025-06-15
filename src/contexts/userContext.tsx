// userContext.tsx
import { userAuthStore } from "@/features/auth/store/userAuthStore";
import React, { createContext, ReactNode } from "react";

export const UserContext = createContext<any>(undefined);

const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const { authUser } = userAuthStore();
  const value: any = authUser;
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserDataProvider;
