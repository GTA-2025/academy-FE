import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  isVisible: boolean;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (type: ToastType, message: string, duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      type,
      message,
      duration,
      isVisible: true,
    };

    set(state => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto remove after duration
    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },

  removeToast: (id: string) => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));

// Convenience functions
export const toaster = {
  toastS: (message: string, duration?: number) => {
    useToastStore.getState().addToast("success", message, duration);
  },

  toastE: (message: string, duration?: number) => {
    useToastStore.getState().addToast("error", message, duration);
  },

  toastW: (message: string, duration?: number) => {
    useToastStore.getState().addToast("warning", message, duration);
  },

  toastI: (message: string, duration?: number) => {
    useToastStore.getState().addToast("info", message, duration);
  },

  toastCustom: (
    message: string,
    type: ToastType = "info",
    duration?: number
  ) => {
    useToastStore.getState().addToast(type, message, duration);
  },

  toastImportant: (message: string, type: ToastType = "info") => {
    useToastStore.getState().addToast(type, message, 8000);
  },

  toastPersistent: (message: string, type: ToastType = "info") => {
    useToastStore.getState().addToast(type, message, 0); // 0 means no auto-close
  },
};
