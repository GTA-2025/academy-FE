"use client";
import Header from "../components/Headers";
import Index from "@/components/landing";
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
      <div className="w-full  pt-12 lg:pt-0  sm:pt- flex flex-col items-center">
        <Index />
      </div>
    </ScreenWrapper>
  );
};

export default page;
