"use client";
import Link from "next/link";
import FinlogixWidget from "./FinlogixWidget";
import { webName } from "@/constants";


const Hero = () => {
  return (
    <>
      <section className=" font-latoRegular  xl:py-[6rem] w-full flex-col  xl:flex-row  gap-[3rem] flex justify-between ">
        {/* first phase */}
        <section className=" w-full  xl:w-[50%]   ">
          {/* Update */}
          <div className=" p-1 rounded-full text-[14px] w-[200px] dark:border-slate-600 border-slate-400 border ">
            <p className="flex gap-3   items-center">
              <span className="font-lato-bold bg-blue-600  text-white p-1 w-[60px] text-center rounded-full">
                NEW
              </span>{" "}
              GTA updates v1.0
            </p>
          </div>

          {/* Topic */}

          <div className=" w-full flex    ">
            <div className=" mt-[3rem]  font-bold  dark:text-white">
              <h1 className=" md:text-8xl sm:w-[80%] md:w-full xl:text-8xl sm:text-8xl text-[60px] leading-[70px] text-shadow-light">
                All you need <br className="hidden" />
                to know to be <br className=" hidden " /> a profitable{" "}
                <br className=" hidden" />
                <span className="outline-text text-thick-shadow dark:text-thick-shadow-dark">
                  trader.
                </span>
              </h1>

              <p className=" font-light sm:w-[90%] mt-5 sm:text-2xl text-xl text-justify tracking-wider sm:mt-[2rem] ">
                Join{" "}
                <span className="text-green-800  font-bold">{webName[0]}</span>
                <span className="text-red-500  font-bold"> {webName[1]}</span>
                <span className="text-blue-600 font-bold"> {webName[2]} </span>
                and unlock the world of forex trading with our premier Forex
                academy. Access comprehensive courses and resources to guide you
                toward financial success. Start your journey today!
              </p>

              <div className=" flex gap-4  sm:w-[60%] w-full justify-between">
                <Link
                  onClick={() => console.log("Clicked")}
                  href={"/auth/login"}
                  className="flex mt-10    xl:w-[50%] text-blue-600 items-center mx-auto sm:mx-0  sm:w-[50%]  sm:rounded-3xl gap-2 sm:h-[70px]  h-[60px] border-blue-600 border-[2px] w-full rounded-full justify-center p-5 text-xl font-bold"
                >
                  <span className=" text-xl  ">LOGIN</span>
                </Link>
                <Link
                  onClick={() => console.log("Clicked")}
                  href={"/auth/sign-up"}
                  className="flex mt-10 xl:w-[50%] sm:w-[50%]  h-[60px] items-center mx-auto sm:mx-0  sm:rounded-3xl gap-2 sm:h-[70px]  text-white bg-blue-600 w-full rounded-full justify-center p-5 text-xl font-bold"
                >
                  <p>SIGN UP</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Second Phase */}
        <section className=" h-[500px] sm:h-[700px] xl:w-[50%]  ">
          <FinlogixWidget />
        </section>
      </section>
    </>
  );
};

export default Hero;
