// userContext.tsx
import { userAuthStore } from "@/store/user-auth-store";
import React, { createContext, ReactNode } from "react";

export const UserContext = createContext<any>(undefined);

const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const { useAuth } = userAuthStore();
  const value: any = useAuth;
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserDataProvider;
