"use client";

import * as React from "react";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputOTPProps {
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ maxLength, value, onChange, className }, ref) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, inputValue: string) => {
      if (inputValue.length > 1) {
        // Handle paste
        const pastedValue = inputValue.slice(0, maxLength);
        onChange(pastedValue);

        // Focus next input
        const nextIndex = Math.min(pastedValue.length, maxLength - 1);
        inputRefs.current[nextIndex]?.focus();
      } else {
        // Handle single character
        const newValue = value.split("");
        newValue[index] = inputValue;
        const result = newValue.join("").slice(0, maxLength);
        onChange(result);

        // Focus next input
        if (inputValue && index < maxLength - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handleFocus = (index: number) => {
      inputRefs.current[index]?.select();
    };

    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)}>
        {Array.from({ length: maxLength }).map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={el => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={value[index] || ""}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onFocus={() => handleFocus(index)}
              className={cn(
                "h-10 w-10 text-center text-base font-medium border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                "focus:border-blue-600 dark:focus:border-blue-600  ",
                "transition-colors duration-200",
                "outline-none"
              )}
            />
            {index < maxLength - 1 && index % 2 === 1 && (
              <Dot className="w-4 h-4 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-10 w-10 text-center text-base font-medium border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
      "focus-within:border-blue-500 dark:focus-within:border-blue-400",
      "transition-colors duration-200",
      className
    )}
    {...props}
  />
));
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot className="w-4 h-4 text-gray-400" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
