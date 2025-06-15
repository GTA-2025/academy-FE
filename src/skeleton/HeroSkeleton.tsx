const HeroSkeleton = () => {
  return (
    <section className="font-latoRegular xl:py-[6rem] w-full flex-col xl:flex-row gap-[3rem] flex justify-between animate-pulse">
      {/* First Phase */}
      <section className="w-full xl:w-[50%]">
        {/* Update badge skeleton bg-neutral-400 */}
        <div className="w-[200px] h-[30px] rounded-full skeleton bg-neutral-400"></div>

        {/* Heading skeleton bg-neutral-400s */}
        <div className="mt-[3rem]">
          {/* Title lines */}
          <div className="space-y-4">
            <div className="h-16 w-[90%] skeleton bg-neutral-400"></div>
            <div className="h-16 w-[70%] skeleton bg-neutral-400"></div>
            <div className="h-16 w-[80%] skeleton bg-neutral-400"></div>
          </div>

          {/* Paragraph skeleton bg-neutral-400 */}
          <div className="mt-[2rem] space-y-3">
            <div className="h-6 w-full skeleton bg-neutral-400"></div>
            <div className="h-6 w-[90%] skeleton bg-neutral-400"></div>
            <div className="h-6 w-[85%] skeleton bg-neutral-400"></div>
          </div>

          {/* Buttons skeleton bg-neutral-400 */}
          <div className="flex gap-4 sm:w-[60%] w-full justify-between mt-10">
            <div className="h-[70px] w-full rounded-full skeleton bg-neutral-400"></div>
            <div className="h-[70px] w-full rounded-full skeleton bg-neutral-400"></div>
          </div>
        </div>
      </section>

      {/* Second Phase - Widget Area */}
      <section className="h-[500px] sm:h-[700px] xl:w-[50%]">
        <div className="w-full h-full skeleton bg-neutral-400 rounded-lg"></div>
      </section>
    </section>
  );
};

export default HeroSkeleton;
