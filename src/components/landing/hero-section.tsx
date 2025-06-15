"use client";
import Link from "next/link";
import { webName } from "@/constants";
import MarketOverview from "../MarketOverview";

const HeroSection = () => {
  return (
    <section className="lg:px-[2rem] xl:px-[5rem] font-latoRegular py-8 md:py-12 lg:py-[3rem] xl:py-[5rem] flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[3rem] flex justify-between max-w-[1920px] mx-auto">
      {/* First Phase */}
      <section className="w-full px-4 sm:px-5 md:px-6 lg:px-8 xl:w-[50%]">
        <div className="p-1 rounded-full text-[12px] sm:text-[14px] w-[180px] sm:w-[200px] dark:border-slate-600 border-slate-400 border">
          <p className="flex gap-2 sm:gap-3 items-center">
            <span className="font-lato-bold bg-blue-600 text-white p-1 w-[50px] sm:w-[60px] text-center rounded-full">
              NEW
            </span>{" "}
            GTA updates v1.0
          </p>
        </div>

        <div className="w-full flex">
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-[3rem] font-bold dark:text-white">
            <h1 className="text-[40px] sm:text-[5rem] md:text-[6rem] lg:text-[3.6rem] xl:text-[4.5rem]  leading-[1.2] text-shadow-light">
              All you need to know to be a profitable{" "}
              <span className="outline-text text-thick-shadow dark:text-thick-shadow-dark">
                trader.
              </span>
            </h1>

            <p className="font-light mt-4 sm:mt-5 md:mt-6 lg:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-xl text-justify tracking-wider max-w-[90%] lg:max-w-full">
              Join <span className="font-bold">{webName[0]}</span>
              <span className="font-bold"> {webName[1]}</span>
              <span className="font-bold"> {webName[2]} </span>
              and unlock the world of forex trading with our premier Forex
              academy. Access comprehensive courses and resources to guide you
              toward financial success. Start your journey today!
            </p>

            <div className="flex sm:flex-row gap-4 mt-8 sm:mt-10 md:mt-12 lg:mt-10 max-w-[90%] lg:max-w-full">
              <Link
                href={"/auth/login"}
                className="flex  w-full sm:w-[50%] text-blue-600 items-center justify-center gap-2 h-[50px] sm:h-[60px] md:h-[70px] border-blue-600 border-[0.1px] rounded-full sm:rounded-3xl text-base sm:text-lg md:text-xl font-bold transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <span>LOGIN</span>
              </Link>
              <Link
                href={"/auth/sign-up"}
                className="flex w-full sm:w-[50%] h-[50px] sm:h-[60px] md:h-[70px] items-center justify-center gap-2 text-white bg-blue-600 rounded-full sm:rounded-3xl text-base sm:text-lg md:text-xl font-bold transition-all hover:bg-blue-700"
              >
                <p>SIGN UP</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Second Phase */}
      <section className="w-[95%] mx-auto xl:w-[50%] mt-8 sm:mt-10 md:mt-12  lg:mt-0">
        <MarketOverview />
      </section>
    </section>
  );
};

export default HeroSection;
