"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/api";
import { toaster } from "@/config/config";
import logo from "../../../../public/assets/logo.jpg";
import Image from "next/image";
import dashboard from "../../../../public/assets/dashboard.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "Muiz",
    last_name: "Oyetola",
    phone: "09041589381",
    country: "NG",
    email: "oyetolamuiz81@gmail.com",
    password: "19210042003Mn@",
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      first_name: "",
      last_name: "",
      phone: "",
      country: "",
      email: "",
      password: "",
    };
    let isValid = true;

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.agreeTerms) {
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      if (!formData.agreeTerms) {
        toaster.toastE("You must agree to the Terms & Privacy");
      }
      return;
    }

    try {
      const response = await axiosInstance.post("/api/auth/sign-up", {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        country: formData.country,
        email: formData.email,
        password: formData.password,
      });

      if (response.data && response.data.token) {
        toaster.toastS(
          response.data.message || "Account created successfully!"
        );
        router.push("/auth/verify-email");
      } else {
        toaster.toastE("Signup failed: No token received");
      }
    } catch (error: any) {
      toaster.toastE(
        error.response?.data.message || "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="w-full md:mx-auto lg:w-full flex min-h-screen bg-white dark:bg-[#0a0a0a] justify-center items-center py-12">
      <div className="flex max-w-[1300px] w-full rounded-xl overflow-hidden">
        {/* Left Section: Form */}
        <div className="w-full sm:w-1/2 sm:mx-auto lg:w-1/2 md:mx-auto md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
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
            <div className="flex w-full justify-between gap-4">
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
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="John"
                  error={errors.first_name}
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
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  error={errors.last_name}
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
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                error={errors.email}
              />
            </div>

            <div className="flex w-full justify-between gap-4">
              {/* Phone */}
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 904 158 9381"
                  error={errors.phone}
                />
              </div>

              {/* Country */}
              <div className="w-full">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Country Code
                </label>
                <Input
                  type="text"
                  id="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="NG"
                  error={errors.country}
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
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                error={errors.password}
              />
              <p className="text-gray-500 text-xs mt-1">min 8 chars</p>
            </div>

            {/* Terms & Privacy Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 focus:ring-brand-primary dark:bg-black checked:bg-brand-primary checked:border-brand-primary"
              />
              <label
                htmlFor="agreeTerms"
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
              className="w-full h-[60px] py-6 text-xl font-semi-bold"
              size="lg"
            >
              Create Account
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
        <div className="hidden h-[700px] lg:flex w-1/2 bg-brand-primary p-12 flex-col justify-between rounded-[1rem] relative overflow-hidden">
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
