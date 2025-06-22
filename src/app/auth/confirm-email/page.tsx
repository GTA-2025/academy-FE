"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../../public/assets/logo.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InputOTP } from "@/components/ui/input-otp";
import { userAuthStore } from "@/store/user-auth-store";

const ConfirmEmailPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const {
    useVerifyEmail,
    useResendVerification,
    isVerifyingEmail,
    isResendingCode,
  } = userAuthStore();

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleVerifyEmail = async () => {
    const success = await useVerifyEmail(otp);
    if (success) {
      router.replace("/auth/login"); // Redirect to login after verification
    }
  };

  const handleResendCode = async () => {
    await useResendVerification();
  };

  return (
    <div className="w-full mx-auto lg:w-full flex min-h-screen bg-white dark:bg-[#0a0a0a] justify-center items-center py-12">
      <div className="flex max-w-[500px] w-full rounded-xl overflow-hidden">
        {/* Centered Form */}
        <div className="w-full p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            {/* Logo */}
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
              Verify Your Email
            </h1>
            <p className="text-gray-600 text-center dark:text-gray-400 text-sm">
              We've sent a 6-digit verification code to your email address
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpChange}
                  className="gap-2"
                />
              </div>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerifyEmail}
              className="w-full h-[60px] py-6 text-xl font-semi-bold"
              size="lg"
              disabled={isVerifyingEmail || otp.length !== 6}
              isLoading={isVerifyingEmail}
            >
              {isVerifyingEmail ? "Verifying..." : "Verify Email"}
            </Button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendCode}
                disabled={isResendingCode}
                className="text-brand-primary hover:underline text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResendingCode ? "Sending..." : "Resend Code"}
              </button>
            </div>
          </div>

          {/* Back to Sign In */}
          <p className="text-center text-sm mt-8 text-gray-600 dark:text-gray-400">
            <Link
              href="/auth/login"
              className="text-brand-primary hover:underline"
            >
              ← Back to Sign In
            </Link>
          </p>

          {/* Copyright */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
            2025 GTA, All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
