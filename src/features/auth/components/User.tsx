'use client'
import React, { useState } from "react";
import { UserData } from "../types/types";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { userAuthStore } from "../store/userAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserDesktopTemplate = ({ user }: { user: UserData }) => {
  const { logout } = userAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await logout();
      setIsOpen(false);
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
      <div className="flex items-center justify-between w-full gap-3">
        <p className="text-gray-800 dark:text-white">{user?.username || user?.email}</p>
        <div className="">
          <div
              onClick={() => setIsOpen((prev) => !prev)}
              className=" overflow-hidden border-2 rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Avatar className=" h-[30px] w-[30px] ">
              <AvatarImage
                  className="h-full w-full object-cover rounded-full"
                  src={user?.profilePicture}
                  alt={`${user?.firstName} ${user?.lastName}`}
              />
              {user?.firstName && user?.lastName && (
                  <AvatarFallback className="flex items-center justify-center dark:bg-gray-500  bg-gray-200 dark:text-white text-black  font-bold text-xs shadow-lg h-full w-full">
                    {user?.firstName[0]}
                    {user?.lastName[0]}
                  </AvatarFallback>
              )}
            </Avatar>
          </div>
          {isOpen && (
              <ul
                  className="absolute right-0 z-10 mt-2 p-1 w-52 bg-white dark:bg-[#0A0A0A] border shadow-lg rounded-lg hidden lg:flex overflow-hidden"
                  onMouseLeave={() => setIsOpen(false)}
              >
                <li>
                  <button
                      onClick={handleLogout}
                      className="w-full p-2 hover:bg-gray-100 dark:hover:bg-[#2F2F2F] rounded-md text-gray-800 dark:text-white cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </div>
                  </button>
                </li>
              </ul>
          )}
        </div>
      </div>
  );
};

export default UserDesktopTemplate;