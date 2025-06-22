"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userAuthStore } from "@/store/user-auth-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../../../../public/assets/logo.jpg";
import Image from "next/image";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isResettingPassword = userAuthStore(state => state.isResettingPassword);
  const useResetPassword = userAuthStore(state => state.useResetPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await useResetPassword(otp, newPassword, confirmPassword);
    if (success) {
      router.replace("/auth/login");
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
              Reset Your Password
            </h1>
            <p className="text-gray-600 text-center dark:text-gray-400 text-sm">
              Enter the OTP sent to your email and set a new password.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                OTP
              </label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="Enter OTP"
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                autoComplete="off"
              />
            </div>
            <Button
              type="submit"
              isLoading={isResettingPassword}
              className="w-full h-[60px] py-6 text-xl font-semi-bold"
              size="lg"
              disabled={isResettingPassword}
            >
              {isResettingPassword ? "Resetting..." : "Reset Password"}
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

export default ForgetPasswordPage;
