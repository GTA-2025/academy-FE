"use client";
import Header from "../components/Headers";
import Hero from "@/components/Hero";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/modeToggler";
import ScreenWrapper from "@/components/ScreenWrapper";
import { navLinks } from "@/constants";

const page = () => {
  return (
    <ScreenWrapper>
      <Header
        logo={<Logo href="/" />}
        navLinks={navLinks}
        modeToggler={<ModeToggle />}
      />
      <div className="w-full  pt-12 sm:pt-6 flex flex-col items-center">
        <Hero />
      </div>
    </ScreenWrapper>
  );
};

export default page;
