import type { Metadata } from "next";
import { ToastContainer, Bounce } from "react-toastify";

import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import localfont from "next/font/local";

const lato = localfont({
  src: [
    {
      path: "../../public/fonts/Lato-Regular.ttf",
    },
  ],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "GTA",
  description: "Connect, Share, and Engage with the GTA Community",
  applicationName: "GTA Social Network",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GTA",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  manifest: "/manifest.json",
  icons: {
    apple: [
      { url: "/icons/icon-192x192.png" },
      { url: "/icons/icon-152x152.png", sizes: "152x152" },
      { url: "/icons/icon-144x144.png", sizes: "144x144" },
      { url: "/icons/icon-192x192.png", sizes: "192x192" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },
  keywords: [
    "forex trading",
    "forex platform",
    "currency trading",
    "forex market",
    "GTA forex",
    "real-time forex data",
    "forex tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${lato.variable} bg-white dark:bg-[#0a0a0a]`}>
        {/* ThemeProvider ensures consistent theme rendering */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
          <div className="  ">
            <div className=" ">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
