import React, { ReactNode } from 'react'
const Headers = ({ logo, modeToggler }: { logo: ReactNode, modeToggler: ReactNode }) => {
  return (
    <>
      <section className=" w-full py-3 px-10 flex items-center justify-between z-[4000] sticky top-0 bg-white dark:bg-neutral-950 ">
        <div className="">{logo}</div>

        <div className=" flex gap-[0.5rem]  items-center justify-end ">
          <div className="hover:opacity-80 ">{modeToggler}</div>
        </div>
      </section>

    </>
  )
}

export default Headers
