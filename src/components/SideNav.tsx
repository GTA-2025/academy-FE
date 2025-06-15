import { HeaderItems } from "@/types/type";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";

const SideNav = ({ navLinks }: { navLinks: HeaderItems[] }) => {
  const router = useRouter()
  return (
    <div className=" lg:hidden  bg-white dark:bg-[#0a0a0a] h-[100%] flex flex-col items-center px-5 fixed w-full top-0 pt-[5rem] ">
      <div className=" flex flex-col w-full">
        <div className="font-semibold">
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

        <div className="mt-6 flex flex-col opacity-80 gap-[2rem]">
          {navLinks.map(items => (
            <div key={items.name} className="  flex flex-col gap-[5rem] ">
              <Link href={items.link}>{items.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
