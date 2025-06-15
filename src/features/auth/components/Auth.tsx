"use client";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import AuthSkeleton from "../skeleton/AuthSkeleton";
import { useAuthCheck } from "../hooks/uesAuthCheck";
import { ChevronRight } from "lucide-react";
import User from "./User";

const Auth = ({ dashboard }: { dashboard?: boolean }) => {
  const router = useRouter();
  const { isLoading, loadingUI, user } = useAuthCheck({
    LoadingComponent: AuthSkeleton,
    requireAuth: false,
  });

  if (isLoading) return loadingUI;

  return (
    <div className=" cursor-pointer">
      {user ? (
        <div className=" flex flex-col lg:flex-row  gap-[1rem] items-center">
          {dashboard &&
            <p onClick={() => router.push("/home/education")} className=" border rounded-md  p-[2px] px-2 lg:flex items-center hidden ">
              <span>Dashboard </span>
              <ChevronRight className="w-4 h-4" />
            </p>}

          <User user={user} />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Auth;
