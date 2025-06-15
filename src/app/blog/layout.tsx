"use client";

import Header from "@/components/Headers";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/modeToggler";
import ScreenWrapper from "@/components/ScreenWrapper";
import { navLinks } from "@/constants";
import { Footer } from "react-day-picker";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScreenWrapper>
      <Header
        logo={<Logo href="/" />}
        navLinks={navLinks}
        modeToggler={<ModeToggle />}
      />
      <div className="w-full pt-12 lg:pt-0 sm:pt-0 flex flex-col items-center">
        {children}
      </div>
    </ScreenWrapper>
  );
}
