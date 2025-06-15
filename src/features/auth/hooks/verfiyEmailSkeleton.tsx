"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { userAuthStore } from "../store/userAuthStore"; // adjust path as needed

interface UseAuthCheckProps {
  LoadingComponent?: React.ComponentType<any>;
  redirectPath?: string;
  LoadingComponentProps?: Record<string, any>;
  requireAuth?: boolean;
}

export const useAuthCheck = ({
  LoadingComponent,
  redirectPath,
  LoadingComponentProps = {},
  requireAuth = true,
}: UseAuthCheckProps = {}) => {
  const router = useRouter();
  const { checkAuth, isCheckingAuth, authUser } = userAuthStore();

  useEffect(() => {
    // Ensure checkAuth is called when the hook mounts
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && authUser.isVerified && redirectPath && requireAuth) {
      router.push(redirectPath);
    }
  }, [authUser, isCheckingAuth, router, redirectPath, requireAuth]);

  // Show loading state whenever we're checking auth, regardless of requireAuth
  if (isCheckingAuth && LoadingComponent) {
    return {
      isLoading: true,
      loadingUI: <LoadingComponent {...LoadingComponentProps} />,
      user: null,
    };
  }

  return {
    isLoading: false,
    loadingUI: null,
    user: authUser,
  };
};

