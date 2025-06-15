
"use client";
import { HeaderProps } from "@/types/type";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SideNav from "./SideNav";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";


const Header = ({ logo, navLinks,modeToggler }: HeaderProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter()


  return (
    <>
      <section className=" w-full py-3  flex items-center justify-between z-[4000] sticky top-0 bg-white dark:bg-neutral-950 ">
        <div className="">{logo}</div>

        <div className="lg:flex  flex-row items-center lg:gap-[3rem] xl:gap-[4rem] hidden">
          {navLinks?.map(items => (
            <Link
              className="hover:opacity-80 "
              href={items.link}
              key={items.name}
            >
              {items.name}
            </Link>
          ))}
        </div>

        <div className=" flex gap-[0.5rem]  items-center justify-end ">
          <div className=" lg:flex hidden  ">
            <div className=" sm:flex-row flex lg:mb-0 mb-[5rem]  flex-col gap-4 items-center h-[40px]   ">
              <CustomButton
                title="Login"
                styles=" border-[1px] lg:border-[2px] border-initialPrimary-500 flex items-center justify-center w-full h-[40px] lg:w-[120px] hover:opacity-80 text-initialPrimary-500 py-2 rounded-md lg:rounded-full  px-6 "
                action={() => router.push("/auth/login")}
              />

              <CustomButton
                title="Sign Up"
                styles=" border-initialPrimary-500 border-[2px] w-full flex items-center rounded-md h-[40px] justify-center lg:w-[120px] hover:opacity-80  bg-initialPrimary-500 text-white py-2 lg:rounded-full  px-6 "
                action={() => router.push("/auth/sign-up")}
              />
            </div>
          </div>

          <div className="hover:opacity-80 ">{modeToggler}</div>
          <button
            className=" lg:hidden  "
            onClick={() => setToggle(prev => !prev)}
          >
            {" "}
            {toggle ? <X /> : <Menu />}
          </button>
        </div>
      </section>
      {toggle && <SideNav navLinks={navLinks} />}
    </>
  );
};

export default Header;
