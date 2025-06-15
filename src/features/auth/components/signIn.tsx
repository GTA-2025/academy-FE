import LoginSubmitter from "./LoginSubmmiter";

const LogIn = () => {
  return (
    <>
      <section className=" gap-[3rem] xl:px-[5rem] p-[1rem] w-full justify-center items-center h-screen lg:fixed  grid sm:px-[9rem] md:px-[13rem] xl:grid-cols-2 grid-cols-1 bg-white dark:bg-[#0a0a0a] ">
        {/* Phase one  */}
        <section className=" w-full h-full xl:pr-[5rem]  flex flex-col  ">
          {/* Login section */}
          <section className="  w-full lg:h-full gap-[5rem] justify-center flex flex-col">
            <LoginSubmitter />
          </section>
        </section>
      </section> 
    </>
  );
};

export default LogIn;
