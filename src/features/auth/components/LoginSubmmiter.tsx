"use client";
import React from "react"
import { useState, useEffect, useCallback } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginFormI } from "../types/types";




// Custom email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



const LoginSubmitter = () => {
  const router = useRouter();
  const { login, isLoggingIn } = userAuthStore();
  const [formState, setFormState] = useState<LoginFormI>({
    emailOrUsername: "",
    password: "",
    isPasswordVisible: false,
  });

  const [validationState, setValidationState] = useState({
    isValid: false,
    errorMessage: "",
  });

  // Validate email/username
  const validateInput = useCallback((input: string) => {
    if (!input) return { isValid: false, errorMessage: "" };

    if (isValidEmail(input)) {
      return { isValid: true, errorMessage: "" };
    }

    if (input.includes("@")) {
      return { isValid: false, errorMessage: "Please enter a valid email" };
    }

    if (!input.endsWith(".gta")) {
      return { isValid: false, errorMessage: "Username must end with '.gta'" };
    }

    return { isValid: true, errorMessage: "" };
  }, []);

  // Validate form on input changes
  useEffect(() => {
    const emailValidation = validateInput(formState.emailOrUsername);

    setValidationState({
      isValid: emailValidation.isValid && !!formState.password,
      errorMessage: emailValidation.errorMessage,
    });
  }, [formState.emailOrUsername, formState.password, validateInput]);

  // Handle input changes
  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validationState.isValid) return;


    const formData: LoginFormI = {
      emailOrUsername: formState.emailOrUsername,
      password: formState.password,
    };

    // Wait for login to complete and store the result
    const response = await login(formData);

    // Only navigate if login was successful
    if (response?.data) return router.push("/home/education");

  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setFormState((prev: LoginFormI) => ({
      ...prev,
      isPasswordVisible: !prev.isPasswordVisible,
    }));
  };

  return (
    <section>
      <h1 className="text-3xl mt-[6rem] sm:mt-0 font-bold text-center">Welcome Back</h1>
      <p className="mt-9 text-center font-light">
        Please enter your account details
      </p>
      <div className="bg-white dark:border-slate-800 dark:bg-[black] w-full md:p-[2rem] p-4 border rounded-[8px] mt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email/Username Input */}
          <div className="flex flex-col">
            <label htmlFor="email">Username or Email</label>
            <input
              id="email"
              placeholder="gtaweb@gmail.com or test.gta"
              type="text"
              value={formState.emailOrUsername}
              onChange={handleInputChange("emailOrUsername")}
              className={`mt-2 w-full px-3 sm:p-3 py-4 border ${!validationState.isValid && formState.emailOrUsername
                ? "border-red-400"
                : "border-slate-400"
                } rounded-md focus:outline-none  focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:text-slate-300 dark:bg-[black] dark:placeholder-slate-500`}
              autoComplete="off"
            />
            {validationState.errorMessage && (
              <p className="text-xs mt-2 text-red-500">
                {validationState.errorMessage}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="flex justify-between">
              <span>Password</span>
              <p className="text-blue-600 cursor-pointer">Forgot?</p>
            </label>
            <div className="flex">
              <input
                id="password"
                placeholder="••••••••"
                type={formState.isPasswordVisible ? "text" : "password"}
                value={formState.password}
                onChange={handleInputChange("password")}
                className="mt-1 w-full px-3 py-4 sm:p-3 border border-slate-400 rounded-l-md rounded-r-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:text-slate-300 dark:bg-[black] dark:placeholder-slate-500"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-center text-[small] mt-1 bg-white dark:bg-black border-slate-400 border rounded-r-md xl:w-[10%] w-[15%] flex items-center justify-center px-3 py-2"
              >
                {formState.isPasswordVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!validationState.isValid || isLoggingIn}
            className={`mt-4 rounded-md sm:h-[60px] w-full text-xl sm:text-2xl mb-[1rem] px-3 h-[55px] py-4 ${!validationState.isValid
              ? "bg-gray-300 cursor-not-allowed dark:bg-slate-600 text-slate-400"
              : "bg-blue-600 text-white"
              } flex justify-center items-center w-full`}
          >
            {isLoggingIn ? (
              <div className=" flex gap-1 items-center ">
                <Loader className=" animate-spin" />
                <span>Loading</span>
              </div>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center w-full md:flex gap-2 flex justify-center mt-3">
            <span>Don&apos;t have an account? </span>
            <Link
              className="text-blue-600 font-semibold"
              href={"/auth/sign-up"}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginSubmitter;