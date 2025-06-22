"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../../public/assets/logo.jpg";
import Image from "next/image";
import dashboard from "../../../../public/assets/dashboard.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpPayloadI } from "@/types/auth";
import { userAuthStore } from "@/store/user-auth-store";

const SignUpPage = () => {
  const router = useRouter();
  const { useSignUp, signUpErrors, isSigningUp, clearErrors } = userAuthStore();

  const [payload, setPayload] = useState<SignUpPayloadI>({
    first_name: "Muiz",
    last_name: "Oyetola",
    phone: "09041589381",
    country: "NG",
    email: "oyetolamuiz81@gmail.com",
    password: "19210042003Mn@",
    agree_terms: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setPayload(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    // Clear errors when user starts typing
    if (signUpErrors[id as keyof SignUpPayloadI]) {
      clearErrors();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await useSignUp(payload);
    if (success) {
      router.push("/auth/confirm-email"); // TODO: Uncomment when ready
    }
  };

  return (
    <div className="w-full md:mx-auto  lg:w-full flex min-h-screen bg-white dark:bg-[#0a0a0a] justify-center items-center py-12">
      <div className="flex max-w-[1300px] w-full items-center justify-center rounded-xl overflow-hidden">
        {/* Left Section: Form */}
        <div className="w-full sm:w-1/2 sm:mx-auto lg:w-1/2 md:mx-auto  p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            {/* Logo */}
            <div className="flex w-full justify-center lg:justify-start items-center mb-6">
              <Image
                width={40}
                height={40}
                loading="lazy"
                src={logo}
                alt="logo"
              />
            </div>
            <h1 className="text-3xl text-center lg:text-left text-gray-800 dark:text-gray-100 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600 text-center lg:text-left dark:text-gray-400 text-sm">
              Join our community and start your trading journey
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex w-full justify-between gap-2">
              {/* First Name */}
              <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  First Name
                </label>
                <Input
                  type="text"
                  id="first_name"
                  className="w-full"
                  value={payload.first_name}
                  onChange={handleInputChange}
                  placeholder="John"
                  error={signUpErrors.first_name}
                />
              </div>

              {/* Last Name */}
              <div className="w-full">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Last Name
                </label>
                <Input
                  type="text"
                  id="last_name"
                  value={payload.last_name}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  error={signUpErrors.last_name}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email address
              </label>
              <Input
                type="email"
                id="email"
                value={payload.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                error={signUpErrors.email}
              />
            </div>

            <div className="flex w-full justify-between gap-2">
              {/* Phone */}
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Phone
                </label>
                <Input
                  type="tel"
                  id="phone"
                  value={payload.phone}
                  onChange={handleInputChange}
                  placeholder="09041589381"
                  error={signUpErrors.phone}
                />
              </div>

              {/* Country */}
              <div className="w-full">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Country
                </label>
                <Input
                  type="text"
                  id="country"
                  value={payload.country}
                  onChange={handleInputChange}
                  placeholder="NG"
                  error={signUpErrors.country}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={payload.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                error={signUpErrors.password}
              />
              <p className="text-gray-500 text-xs mt-1">
                Must contain uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Terms & Privacy Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree_terms"
                checked={payload.agree_terms}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 focus:ring-brand-primary dark:bg-black checked:bg-brand-primary checked:border-brand-primary"
              />
              <label
                htmlFor="agree_terms"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                I agree to the{" "}
                <Link href="#" className="text-brand-primary hover:underline">
                  Terms & Privacy
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full h-[50px] py-6 text-xl font-semi-bold"
              disabled={isSigningUp}
              isLoading={isSigningUp}
            >
              {isSigningUp ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Already have an account? Sign in */}
          <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-brand-primary hover:underline"
            >
              Sign in
            </Link>
          </p>

          {/* Copyright */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
            2025 GTA, All Right Reserved
          </p>
        </div>

        {/* Right Section: Informative Dashboard Preview */}
        <div className="hidden h-[700px] lg:flex w-1/2 items-center bg-brand-primary p-12 flex-col justify-between rounded-[1rem] relative overflow-hidden">
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Start Your Trading Journey Today
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Join our community of successful traders and learn from the best
          </p>

          {/* Dashboard Image */}
          <div className="relative w-[90%] h-[400px] rounded-lg flex items-center justify-center text-white text-xl overflow-hidden">
            <Image fill src={dashboard} alt="dashboard" />
          </div>

          {/* Partner Logos */}
          <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center items-center mt-auto">
            <span className="text-white opacity-70">WeChat</span>
            <span className="text-white opacity-70">Booking.com</span>
            <span className="text-white opacity-70">Google</span>
            <span className="text-white opacity-70">Spotify</span>
            <span className="text-white opacity-70">Strip</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
