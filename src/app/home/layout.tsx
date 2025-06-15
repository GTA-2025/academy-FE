"use client";
import React, { ReactNode } from "react";
import UserDataProvider from "@/contexts/userContext";
import { useAuthCheck } from "@/features/auth/hooks/uesAuthCheck";
import Loading from "@/components/Loader";
import { redirect } from "next/navigation";
import Header from "../home/components/Headers";



const HomeLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading, loadingUI, user } = useAuthCheck({
    LoadingComponent: Loading,
  });

  if (isLoading) return loadingUI;

  // If not authenticated, redirect immediately
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <UserDataProvider>
      <Header />

      {children}
    </UserDataProvider>);
};

export default HomeLayout;
