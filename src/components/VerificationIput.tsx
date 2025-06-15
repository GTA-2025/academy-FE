"use client";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/services/api";
import { toaster } from "@/config/config";
import { useRouter } from "next/navigation";

interface Code {
  [key: `digit${number}`]: string;
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
  digit5: string;
  digit6: string;
}

const VerificationInput = ({ title, btnTitle, api, redirect }: { title: string; api: string; btnTitle: string, redirect: string }) => {
  const router = useRouter()
  const [code, setCode] = useState<Code>({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string): void => {
    const newCode = { ...code };

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      pastedCode.forEach((char, i) => {
        newCode[`digit${i + 1}` as keyof Code] = char || "";
      });
      setCode(newCode);

      const focusIndex = pastedCode.findIndex((char) => char === "") + 1;
      if (focusIndex > 0 && focusIndex < 6) {
        inputRefs.current[focusIndex]?.focus();
      }
    } else {
      newCode[`digit${index + 1}` as keyof Code] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && !code[`digit${index + 1}` as keyof Code] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const verificationCode = Object.values(code).join("");
      const response = await axiosInstance.post(api, { code: verificationCode });
      toaster.toastS(response?.data?.message);
      if (response?.data) {
        router.push(redirect)
      }
      setIsLoading(false);
    } catch (error: any) {
      toaster.toastE(error.response?.data?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Object.values(code).every((digit) => digit !== "")) {
      const event = new Event("submit") as unknown as React.FormEvent<HTMLFormElement>;
      handleSubmit(event);
    }
  }, [code]);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center">
      <div className="max-w-md w-full  rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {(Object.keys(code) as Array<keyof Code>).map((key, index) => (
              <input
                key={index}
                ref={(el: any) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={code[key]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={isLoading}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : btnTitle}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">
          Back to sign in
        </p>
      </div>
    </div>
  );
};

export default VerificationInput;

