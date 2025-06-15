import CustomButton from "@/components/CustomButton";
import React from "react";

const AuthSkeleton = () => {
  return (
    <div className=" flex  gap-4 h-[40px] items-center rounded-md bg-neutral-300 skeleton   ">
      <CustomButton
        title=""
        styles="  w-[120px] h-[40px]    px-6 "
        action={() => {}}
      />

      <CustomButton
        title=""
        styles=" w-[120px] h-[40px] py-2   px-6 "
        action={() => {}}
      />
    </div>
  );
};

export default AuthSkeleton;
