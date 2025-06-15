import { HeaderItems } from "@/types/type";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SideNav = ({ navLinks }: { navLinks: HeaderItems[] }) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-white dark:bg-black">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20 }}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "4rem 0.75rem 0",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "28rem",
            margin: "0 auto",
          }}
        >
          <div style={{ fontWeight: 600 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              <CustomButton
                title="Login"
                styles="border-[1px] border-initialPrimary-500 flex items-center justify-center w-full h-[36px] sm:h-[40px] hover:opacity-80 text-initialPrimary-500 py-2 rounded-md px-4 sm:px-6 text-xs sm:text-sm transition-all"
                action={() => router.push("/auth/login")}
              />

              <CustomButton
                title="Sign Up"
                styles="border-initialPrimary-500 border-[2px] w-full flex items-center rounded-md h-[36px] sm:h-[40px] justify-center hover:opacity-80 bg-initialPrimary-500 text-white py-2 px-4 sm:px-6 text-xs sm:text-sm transition-all"
                action={() => router.push("/auth/sign-up")}
              />
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6">
            {navLinks.map((items, index) => (
              <motion.div
                key={items.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Link
                  href={items.link}
                  className="text-sm sm:text-base hover:text-initialPrimary-500 transition-colors py-1.5 sm:py-2"
                >
                  {items.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SideNav;
