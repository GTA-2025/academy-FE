"use client";

import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToastStore, ToastType } from "@/lib/toaster";
import { cn } from "@/lib/utils";

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: {
    background: "bg-white dark:bg-gray-800",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-800 dark:text-green-200",
    icon: "text-green-600",
    shadow: "shadow-green-100 dark:shadow-green-900/20",
  },
  error: {
    background: "bg-white dark:bg-gray-800",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-800 dark:text-red-200",
    icon: "text-red-600",
    shadow: "shadow-red-100 dark:shadow-red-900/20",
  },
  warning: {
    background: "bg-white dark:bg-gray-800",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-800 dark:text-amber-200",
    icon: "text-amber-600",
    shadow: "shadow-amber-100 dark:shadow-amber-900/20",
  },
  info: {
    background: "bg-white dark:bg-gray-800",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-800 dark:text-blue-200",
    icon: "text-blue-600",
    shadow: "shadow-blue-100 dark:shadow-blue-900/20",
  },
};

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const styles = toastStyles[type];
  const Icon = toastIcons[type];

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose(id), 300);
  };

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 ease-out shadow-lg",
        styles.background,
        styles.border,
        styles.shadow,
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-[-100%] opacity-0",
        isLeaving && "translate-y-[-100%] opacity-0"
      )}
      style={{ minWidth: "320px", maxWidth: "400px" }}
    >
      {/* Icon */}
      <div className={cn("flex-shrink-0 mt-0.5", styles.icon)}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium leading-5", styles.text)}>
          {message}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className={cn(
          "flex-shrink-0 p-1 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
          styles.text
        )}
        aria-label="Close toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            id={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={removeToast}
          />
        </div>
      ))}
    </div>
  );
};
