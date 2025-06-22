import { create } from "zustand";
import axiosInstance from "@/services/api";
import { toaster } from "@/lib/toaster";
import Cookie from "js-cookie";
import { LoginPayloadI, SignUpPayloadI } from "@/types/auth";

interface UserAuthStoreTypes {
  isCheckingAuth: null | boolean;
  authUser: null | any;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isVerifyingEmail: boolean;
  isResendingCode: boolean;
  signUpErrors: Partial<SignUpPayloadI>;
  loginErrors: Partial<LoginPayloadI>;

  // Actions
  useAuth: () => void;
  useLogin: (formData: LoginPayloadI) => Promise<boolean>;
  useSignUp: (payload: SignUpPayloadI) => Promise<boolean>;
  useLogout: () => void;
  useVerifyEmail: (code: string) => Promise<boolean>;
  useResendVerification: () => Promise<boolean>;
  useResetPassword: (
    otp: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<boolean>;
  isResettingPassword: boolean;
  clearErrors: () => void;
  validateSignUpForm: (payload: SignUpPayloadI) => boolean;
  validateLoginForm: (formData: LoginPayloadI) => boolean;
}

export const userAuthStore = create<UserAuthStoreTypes>()((set, get) => ({
  isCheckingAuth: true,
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isVerifyingEmail: false,
  isResendingCode: false,
  signUpErrors: {},
  loginErrors: {},
  isResettingPassword: false,

  useAuth: async () => {
    try {
      const token = Cookie.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axiosInstance.get("/api/auth/check-auth", config);
      set({ authUser: res.data.user, isCheckingAuth: false });
    } catch (error: any) {
      console.log(error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  validateLoginForm: (formData: LoginPayloadI) => {
    const errors: Partial<LoginPayloadI> = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    set({ loginErrors: errors });
    return isValid;
  },

  validateSignUpForm: (payload: SignUpPayloadI) => {
    const errors: Partial<SignUpPayloadI> = {};
    let isValid = true;

    if (!payload.first_name.trim()) {
      errors.first_name = "First name is required";
      isValid = false;
    }

    if (!payload.last_name.trim()) {
      errors.last_name = "Last name is required";
      isValid = false;
    }

    if (!payload.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    if (!payload.country.trim()) {
      errors.country = "Country is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation matching backend requirements
    if (payload.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        payload.password
      )
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
      isValid = false;
    }

    if (!payload.agree_terms) {
      toaster.toastE("You must agree to the Terms & Privacy");
      isValid = false;
    }

    set({ signUpErrors: errors });
    return isValid;
  },

  useLogin: async (formData: LoginPayloadI) => {
    try {
      // Validate form
      if (!get().validateLoginForm(formData)) {
        return false;
      }

      set({ isLoggingIn: true });
      console.log("Sending login payload to API:", formData);

      const response = await axiosInstance.post(
        "/api/gta/v1/auth/sign-in",
        formData
      );

      // Check if response.data is a string that needs parsing
      let responseData = response.data;
      if (typeof response.data === "string") {
        try {
          responseData = JSON.parse(response.data);
          console.log("Parsed login response data:", responseData);
        } catch (parseError) {
          console.log(
            "Failed to parse login response.data as JSON:",
            parseError
          );
        }
      }

      // Try multiple ways to extract token
      const token =
        responseData?.token ||
        responseData?.data?.token ||
        responseData?.access_token ||
        responseData?.accessToken ||
        responseData?.auth?.token ||
        responseData?.user?.token;

      if (token) {
        set({
          authUser: responseData?.user || responseData?.data?.user,
          isLoggingIn: false,
        });
        Cookie.set("token", token);
        toaster.toastS(responseData?.message || "Login successful!");
        return true;
      } else {
        console.log(
          "No token found in login response. Available keys:",
          Object.keys(responseData || {})
        );
        toaster.toastE("Login failed: No token received");
        set({ isLoggingIn: false });
        return false;
      }
    } catch (error: any) {
      console.log("Login error:", error);
      console.log("Error response:", error.response);
      console.log("Error message:", error.message);

      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
      }

      toaster.toastE(
        error.response?.data?.message || error.message || "Login failed"
      );
      set({ isLoggingIn: false });
      return false;
    }
  },

  useSignUp: async (payload: SignUpPayloadI) => {
    try {
      // Validate form
      if (!get().validateSignUpForm(payload)) {
        return false;
      }

      set({ isSigningUp: true });
      console.log("Sending payload to API:", payload);

      const response = await axiosInstance.post(
        "/api/gta/v1/auth/sign-up",
        payload
      );

      // Check if response.data is a string that needs parsing
      let responseData = response.data;
      if (typeof response.data === "string") {
        try {
          responseData = JSON.parse(response.data);
          console.log("Parsed response data:", responseData);
        } catch (parseError) {
          console.log("Failed to parse response.data as JSON:", parseError);
        }
      }

      // Try multiple ways to extract token
      const token =
        responseData?.token ||
        responseData?.data?.token ||
        responseData?.access_token ||
        responseData?.accessToken ||
        responseData?.auth?.token ||
        responseData?.user?.token;

      if (token) {
        Cookie.set("token", token);
        toaster.toastS(
          responseData?.message || "Account created successfully!"
        );
        set({ isSigningUp: false });
        return true;
      } else {
        console.log(
          "No token found in response. Available keys:",
          Object.keys(responseData || {})
        );
        toaster.toastE("Signup failed: No token received");
        set({ isSigningUp: false });
        return false;
      }
    } catch (error: any) {
      console.log("Signup error:", error);
      console.log("Error response:", error.response);
      console.log("Error message:", error.message);

      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
      }

      toaster.toastE(
        error.response?.data?.message || error.message || "Signup failed"
      );
      set({ isSigningUp: false });
      return false;
    }
  },

  useVerifyEmail: async (verificationCode: string) => {
    try {
      if (!verificationCode || verificationCode.length !== 6) {
        toaster.toastE("Please enter a valid 6-digit verification code");
        return false;
      }

      set({ isVerifyingEmail: true });

      const token = Cookie.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Send code as string if backend expects it
      const response = await axiosInstance.post(
        "/api/gta/v1/auth/confirm-email",
        { verificationCode },
        config
      );

      if (response.data) {
        toaster.toastS(response.data.message || "Email verified successfully!");
        set({ isVerifyingEmail: false });
        return true;
      } else {
        toaster.toastE("Email verification failed");
        set({ isVerifyingEmail: false });
        return false;
      }
    } catch (error: any) {
      console.log("Email verification error:", error);
      toaster.toastE(
        error.response?.data?.message ||
          error.message ||
          "Email verification failed"
      );
      set({ isVerifyingEmail: false });
      return false;
    }
  },

  useResendVerification: async () => {
    try {
      set({ isResendingCode: true });

      const token = Cookie.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axiosInstance.get(
        "/api/gta/v1/auth/regenerate-email-code",
        config
      );

      if (response.data) {
        toaster.toastS(
          response.data.message || "Verification code sent successfully!"
        );
        set({ isResendingCode: false });
        return true;
      } else {
        toaster.toastE("Failed to resend verification code");
        set({ isResendingCode: false });
        return false;
      }
    } catch (error: any) {
      console.log("Resend verification error:", error);
      toaster.toastE(
        error.response?.data?.message ||
          error.message ||
          "Failed to resend verification code"
      );
      set({ isResendingCode: false });
      return false;
    }
  },

  useResetPassword: async (
    otp: string,
    new_password: string,
    confirmPassword: string
  ) => {
    try {
      if (!otp || !new_password || !confirmPassword) {
        toaster.toastE("All fields are required");
        return false;
      }

      if (new_password !== confirmPassword) {
        toaster.toastE("Passwords do not match");
        return false;
      }

      set({ isResettingPassword: true });

      const token = Cookie.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axiosInstance.post(
        "/api/gta/v1/auth/reset-password",
        { otp, new_password },
        config
      );

      if (response.data) {
        toaster.toastS(response.data.message || "Password reset successfully!");
        set({ isResettingPassword: false });
        return true;
      } else {
        toaster.toastE("Password reset failed");
        set({ isResettingPassword: false });
        return false;
      }
    } catch (error: any) {
      console.log("Password reset error:", error);
      toaster.toastE(
        error.response?.data?.message ||
          error.message ||
          "Password reset failed"
      );
      set({ isResettingPassword: false });
      return false;
    }
  },

  useLogout: async () => {
    try {
      Cookie.remove("token");
      set({ authUser: null });
      toaster.toastS("Logged out successfully");
    } catch (error: any) {
      toaster.toastE(error.response?.data?.message || "Logout failed");
    }
  },

  clearErrors: () => {
    set({ signUpErrors: {}, loginErrors: {} });
  },
}));
