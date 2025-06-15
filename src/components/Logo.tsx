import { images, webName } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ href }: { href: string }) => {
  return (
    <Link href={href} className="flex items-center gap-3">
      <Image
        className="w-[35px] mt-2 h-[35px] bg-contain"
        src={images.logo}
        alt="logo"
      />
      <div className=" hidden  gap-1 xl:text-2xl font-bold  text-xl ">
        <span className="text-success-700 "> {webName[0]} </span>
        <span className=" text-danger-600  "> {webName[1]} </span>
        <span className="text-initialPrimary-500 "> {webName[2]} </span>
      </div>
    </Link>
  );
};

export default Logo;
