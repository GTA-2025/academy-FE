"use client";
import { HeaderProps } from "@/types/type";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SideNav from "./SideNav";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";

const Header = ({ logo, navLinks, modeToggler }: HeaderProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <section className="lg:px-[5rem] px-3 sm:px-6 w-full py-2 sm:py-3 flex items-center justify-between z-[4000] sticky top-0 bg-white dark:bg-neutral-950">
        <div className="flex-shrink-0">{logo}</div>

        <div className="lg:flex flex-row items-center lg:gap-[3rem] xl:gap-[4rem] hidden">
          {navLinks?.map(items => (
            <Link
              className="hover:opacity-80 text-sm lg:text-base transition-opacity whitespace-nowrap"
              href={items.link}
              key={items.name}
            >
              {items.name}
            </Link>
          ))}
        </div>

        <div className="flex gap-1 sm:gap-2 items-center justify-end">
          <div className="lg:flex hidden">
            <div className="flex-row flex gap-2 sm:gap-4 items-center h-[40px]">
              <CustomButton
                title="Login"
                styles="border-[0.5px] lg:border-[1px] border-initialPrimary-500 flex items-center justify-center w-full h-[36px] sm:h-[40px] lg:w-[120px] hover:opacity-80 text-initialPrimary-500 py-2 rounded-md lg:rounded-full px-3 sm:px-6 text-xs sm:text-sm lg:text-base transition-all"
                action={() => router.push("/auth/login")}
              />

              <CustomButton
                title="Sign Up"
                styles="border-initialPrimary-500 border-[2px] w-full flex items-center rounded-md h-[36px] sm:h-[40px] justify-center lg:w-[120px] hover:opacity-80 bg-initialPrimary-500 text-white py-2 lg:rounded-full px-3 sm:px-6 text-xs sm:text-sm lg:text-base transition-all"
                action={() => router.push("/auth/sign-up")}
              />
            </div>
          </div>

          <div className="hover:opacity-80 transition-opacity">
            {modeToggler}
          </div>
          <button
            className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={() => setToggle(prev => !prev)}
            aria-label="Toggle menu"
          >
            {toggle ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </section>
      {toggle && (
        <div className="lg:hidden fixed inset-0 z-[3999] bg-black/20 dark:bg-black/40 backdrop-blur-sm">
          <SideNav navLinks={navLinks} />
        </div>
      )}
    </>
  );
};

export default Header;
