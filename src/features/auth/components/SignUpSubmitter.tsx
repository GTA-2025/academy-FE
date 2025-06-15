"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { SignUpFromI } from "../types/types";
import { userAuthStore } from "../store/userAuthStore";
import { useRouter } from "next/navigation";



const SignUpSubmitter = () => {
  const { signUp } = userAuthStore() || {};
  const router = useRouter();

  const [signUpForm, setSignUpForm] = useState<SignUpFromI>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    isPasswordVisible: false,
    isConfirmPasswordVisible: false
  });

  const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000); // Alert will dismiss after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Handle input changes
  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setSignUpForm((prev) => ({
      ...prev,
      isPasswordVisible: !prev.isPasswordVisible,
    }));
  };

  // Toggle confirm password visibility
  const toggleConfirmPassword = () => {
    setSignUpForm((prev) => ({
      ...prev,
      isConfirmPasswordVisible: !prev.isConfirmPasswordVisible,
    }));
  };

  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });

  const [validateState, setValidateState] = useState({
    validFirstName: false,
    validLastName: false,
    validEmail: false,
    validPassword: false,
    validFirstNameMessage: "",
    validLastNameMessage: "",
    validEmailMessage: "",
    validPasswordMessage: "",
    validConfirmPasswordMessage: "",
    signUpBtnMessage: ""
  });

  useEffect(() => {
    if (signUpForm.password !== "") {
      const hasUpperCase = /[A-Z]/.test(signUpForm.password);
      const hasLowerCase = /[a-z]/.test(signUpForm.password);
      const hasNumber = /\d/.test(signUpForm.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(signUpForm.password);
      const isLongEnough = signUpForm.password.length >= 7;

      setPasswordCriteria({
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        isLongEnough,
      });
    } else {
      setPasswordCriteria({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isLongEnough: false,
      });
    }
  }, [signUpForm.password]);

  // Validate form before submission
  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    const newValidateState = { ...validateState };

    // Validate first name
    if (signUpForm.firstName.length < 2) {
      newValidateState.validFirstName = false;
      newValidateState.validFirstNameMessage = "First name must be at least 2 characters";
      isValid = false;
    } else {
      newValidateState.validFirstName = true;
      newValidateState.validFirstNameMessage = "";
    }

    // Validate last name
    if (signUpForm.lastName.length < 2) {
      newValidateState.validLastName = false;
      newValidateState.validLastNameMessage = "Last name must be at least 2 characters";
      isValid = false;
    } else {
      newValidateState.validLastName = true;
      newValidateState.validLastNameMessage = "";
    }

    // Validate email
    if (!emailRegex.test(signUpForm.email)) {
      newValidateState.validEmail = false;
      newValidateState.validEmailMessage = "Please enter a valid email address";
      isValid = false;
    } else {
      newValidateState.validEmail = true;
      newValidateState.validEmailMessage = "";
    }

    // Validate password
    if (!Object.values(passwordCriteria).every(Boolean)) {
      newValidateState.validPassword = false;
      newValidateState.validPasswordMessage = "Password does not meet all requirements";
      isValid = false;
    } else {
      newValidateState.validPassword = true;
      newValidateState.validPasswordMessage = "";
    }

    // Validate confirm password
    if (signUpForm.password !== signUpForm.confirmPassword) {
      newValidateState.validConfirmPasswordMessage = "Passwords do not match";
      isValid = false;
    } else {
      newValidateState.validConfirmPasswordMessage = "";
    }

    setValidateState(newValidateState);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formData: SignUpFromI = {
      firstName: signUpForm.firstName,
      lastName: signUpForm.lastName,
      email: signUpForm.email,
      password: signUpForm.password
    }
    try {
      const response = await signUp(formData)
      //@ts-expect-error: was not able to solve the types error
      if (response?.data) return router.push("/auth/verify-email")
    } catch (error: any) {
      console.log(error)
    }
  };

  return (
    <>
      <section>
        <h1 className="text-3xl font-bold lg:text-center">Create an account</h1>
        <div className="bg-white dark:border-slate-800 dark:bg-[black] w-full md:p-[2rem] p-4 border rounded-[8px] mt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 xl:gap-3">
              {/* First Name*/}
              <div className="flex flex-col">
                <label htmlFor="firstName">first name</label>
                <input
                  id="firstName"
                  placeholder="Muiz"
                  type="text"
                  value={signUpForm.firstName}
                  onChange={handleInputChange("firstName")}
                  className={`mt-2 w-full px-3 sm:p-3 py-4 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:text-slate-300 dark:bg-[black] dark:placeholder-slate-500 ${validateState.validFirstNameMessage ? 'border-red-500' : ''
                    }`}
                  autoComplete="off"
                />
                {validateState.validFirstNameMessage && (
                  <span className="text-red-500 text-sm mt-1">{validateState.validFirstNameMessage}</span>
                )}
              </div>

              {/* Last Name*/}
              <div className="flex flex-col">
                <label htmlFor="lastName">last name</label>
                <input
                  id="lastName"
                  placeholder="Oyetola"
                  type="text"
                  value={signUpForm.lastName}
                  onChange={handleInputChange("lastName")}
                  className={`mt-2 w-full px-3 sm:p-3 py-4 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:text-slate-300 dark:bg-[black] dark:placeholder-slate-500 ${validateState.validLastNameMessage ? 'border-red-500' : ''
                    }`}
                  autoComplete="off"
                />
                {validateState.validLastNameMessage && (
                  <span className="text-red-500 text-sm mt-1">{validateState.validLastNameMessage}</span>
                )}
              </div>
            </div>

            {/* Email*/}
            <div className="flex flex-col">
              <label htmlFor="email">email</label>
              <div className="flex-1">
                <input
                  id="email"
                  placeholder="lowkey@example.com"
                  type="email"
                  value={signUpForm.email}
                  onChange={handleInputChange("email")}
                  className={`mt-2 w-full px-3 sm:p-3 py-4 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:text-slate-300 dark:bg-[black] dark:placeholder-slate-500 ${validateState.validEmailMessage ? 'border-red-500' : ''
                    }`}
                  autoComplete="off"
                />
                {validateState.validEmailMessage && (
                  <span className="text-red-500 text-sm mt-1">{validateState.validEmailMessage}</span>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label htmlFor="password" className="flex justify-between">
                <span>password</span>
              </label>
              <div className="flex">
                <input
                  id="password"
                  placeholder="••••••••"
                  type={signUpForm.isPasswordVisible ? "text" : "password"}
                  value={signUpForm.password}
                  onChange={handleInputChange("password")}
                  className={`mt-1 w-full px-3 py-4 sm:p-3 border border-slate-400 rounded-l-md rounded-r-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:text-slate-300 dark:bg-[black] dark:placeholder-slate-500 ${validateState.validPasswordMessage ? 'border-red-500' : ''
                    }`}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-center text-[small] mt-1 bg-white dark:bg-black border-slate-400 border rounded-r-md xl:w-[10%] w-[15%] flex items-center justify-center px-3 py-2"
                >
                  {signUpForm.isPasswordVisible ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {validateState.validPasswordMessage && (
                <span className="text-red-500 text-sm mt-1">{validateState.validPasswordMessage}</span>
              )}
            </div>

            {/* Password validation messages */}
            <div className="flex flex-col text-[12.9px] font-medium mt-3">
              <span className={passwordCriteria.hasUpperCase ? "text-green-600" : "text-slate-500"}>
                . Mix of uppercase & lowercase letters
              </span>
              <span className={passwordCriteria.isLongEnough ? "text-green-600" : "text-slate-500"}>
                . Minimum 7 characters long
              </span>
              <span className={passwordCriteria.hasNumber ? "text-green-600" : "text-slate-500"}>
                . Contain at least 1 number
              </span>
              <span className={passwordCriteria.hasSpecialChar ? "text-green-600" : "text-slate-500"}>
                . Contain at least 1 special character
              </span>
            </div>

            {/*Confirm password*/}
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="flex justify-between">
                <span>confirm password</span>
              </label>
              <div className="flex">
                <input
                  id="confirmPassword"
                  placeholder="••••••••"
                  type={signUpForm.isConfirmPasswordVisible ? "text" : "password"}
                  value={signUpForm.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  className={`mt-1 w-full px-3 py-4 sm:p-3 border border-slate-400 rounded-l-md rounded-r-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:text-slate-300 dark:bg-[black] dark:placeholder-slate-500 ${validateState.validConfirmPasswordMessage ? 'border-red-500' : ''
                    }`}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="text-center text-[small] mt-1 bg-white dark:bg-black border-slate-400 border rounded-r-md xl:w-[10%] w-[15%] flex items-center justify-center px-3 py-2"
                >
                  {signUpForm.isConfirmPasswordVisible ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {validateState.validConfirmPasswordMessage && (
                <span className="text-red-500 text-sm mt-1">{validateState.validConfirmPasswordMessage}</span>
              )}
            </div>

            {/*Sign up button*/}
            <button
              type="submit"
              className="mt-4 text-white rounded-md sm:h-[60px] w-full text-xl sm:text-2xl mb-[1rem] px-3 h-[55px] py-4 bg-blue-600 flex justify-center items-center"
            >
              Signup
            </button>
            <p className="text-center w-full gap-2 flex md:flex justify-center mt-3">
              <span>have an account? </span>
              <Link className="text-blue-600 font-semibold" href="/auth/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUpSubmitter;
