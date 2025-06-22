"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toaster } from "@/lib/toaster";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from "../../../../public/assets/logo.jpg";
import Image from "next/image";
import axiosInstance from "@/services/api";

const GetResetTokenPage = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toaster.toastE("Please enter your email address");
      return;
    }
    setIsSending(true);
    try {
      await axiosInstance.post("/api/gta/v1/auth/request-password-reset", {
        email,
      });
      toaster.toastS("Reset code sent to your email!");
      router.push("/auth/forget-password");
    } catch (error: any) {
      toaster.toastE(
        error?.response?.data?.message || "Failed to send reset code"
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full mx-auto flex min-h-screen bg-white dark:bg-[#0a0a0a] justify-center items-center py-12">
      <div className="flex max-w-[500px] w-full rounded-xl overflow-hidden">
        <div className="w-full p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex w-full justify-center items-center mb-6">
              <Image
                width={40}
                height={40}
                loading="lazy"
                src={logo}
                alt="logo"
              />
            </div>
            <h1 className="text-3xl text-center text-gray-800 dark:text-gray-100 mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-600 text-center dark:text-gray-400 text-sm">
              Enter your email address to receive a password reset code.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="off"
              />
            </div>
            <Button
              type="submit"
              isLoading={isSending}
              className="w-full h-[60px] py-6 text-xl font-semi-bold"
              size="lg"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>
          <p className="text-center text-sm mt-8 text-gray-600 dark:text-gray-400">
            <Link
              href="/auth/login"
              className="text-brand-primary hover:underline"
            >
              ← Back to Sign In
            </Link>
          </p>
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
            2025 GTA, All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetResetTokenPage;
