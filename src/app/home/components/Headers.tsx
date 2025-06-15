'use client'
import Logo from '@/components/Logo';
import React, { useState, useEffect, useContext } from 'react';
import Link from "next/link"
import { ChevronsUpDown, GraduationCap,BadgePlus, Menu, Search, Globe, Inbox, LayoutDashboard, LibraryBig, UsersRound, MessageSquare, Settings, Slack, X, LogOut, Star, Home, Bell } from 'lucide-react';
import Auth from '@/features/auth/components/Auth';
import { ModeToggle } from '@/components/modeToggler';
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { useAuthCheck } from '@/features/auth/hooks/uesAuthCheck';
import AuthSkeleton from '@/features/auth/skeleton/AuthSkeleton';
import { Avatar, AvatarImage,AvatarFallback } from "@/components/ui/avatar";
import avatar from "../../../../public/assets/avatar.png"
import  Image from "next/image"
import { UserContext } from '@/contexts/userContext'

// Define interfaces for our types
interface SectionType {
  title: string;
  link: string;
  icon: React.ReactNode;
}

interface NotificationI {
  title: string;
  type: string;
  count: number;
}

interface NavLink {
  title: string;
  link: string;
  icon: React.ReactNode;
  notification?: NotificationI
}

interface SectionNavLinks {
  [key: string]: NavLink[];
}

// space Title 
const sectionNavTitle: SectionType[] = [
  {
    title: "Education",
    link: "/home/education",
    icon: <GraduationCap className='w-4 h-4' />
  },
  {
    title: "Socials",
    link: "/home/socials/posts",
    icon: <Slack className='w-4 h-4' />
  },
];

// profile links
const profileLinks = [
  {
    title: "Logout",
    link: "/logout",
    icon: <LogOut className="w-4 h-4" />
  }
];

// Section-specific navigation links
const sectionNavLinks: SectionNavLinks = {
  // Education links 
  Education: [
    {
      title: "Dashboard",
      link: "/home/education",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "School",
      link: "/home/education/school",
      icon: <GraduationCap className="w-5 h-5" />,
      notification: { title: "New video", type: "important", count: 4 }
    },
    {
      title: "Library",
      link: "/home/education/library",
      icon: <LibraryBig className="w-5 h-5" />,
    },
    {
      title: "Tutors",
      link: "/home/education/tutors",
      icon: <UsersRound className="w-5 h-5" />,
    },
    {
      title: "Inbox",
      link: "/home/education/inbox",
      icon: <Inbox className="w-5 h-5" />,
      notification: { title: "New video", type: "important", count: 200 }
    },
    {
      title: "Community",
      link: "/home/education/community",
      icon: <Globe className="w-5 h-5" />,
      notification: { title: "New video", type: "important", count: 500 }
    },
    {
      title: "Settings",
      link: "/home/education/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],
  // Socials link 
  Socials: [
    { title: "Home", link: "/home/socials/posts", icon: <Home className="sm:w-5 w-6 h-6 sm:h-5 " /> },
    { title: "Create", link: "/home/socials/create-post", icon: <BadgePlus  className="sm:w-5 w-6 h-6 sm:h-5 " /> },
    { title: "Chat", link: "/home/socials/chat", icon: <MessageSquare className="sm:w-5  sm:h-5 w-6 h-6" /> },
    { title: "notification", link: "/home/socials/notification", icon: <Bell className="sm:w-5 sm:h-5 w-6 h-6" /> },
    {
      title: "Settings",
      link: "/home/socials/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ]
};

// Add this helper function at the top
const isSocialsRoute = (pathname: string) => pathname.includes('/home/socials');

// Utility function to get initial section
const getInitialSection = (pathname: string): SectionType => {
  if (pathname.includes('/home/socials')) {
    return sectionNavTitle[1]; // Socials section
  }
  return sectionNavTitle[0]; // Education section
};

// Update isActiveRoute utility
const isActiveRoute = (currentPath: string, linkPath: string): boolean => {
  // Handle root social route
  if (linkPath === '/home/socials/') {
    return currentPath === linkPath;
  }
  // Handle other routes
  return currentPath.includes(linkPath);
};

/**
 * Profile component for mobile header
 * Displays user avatar and links to profile page
 */
const MobileProfile: React.FC = () => {
  const user = useContext(UserContext)
  
  return (
    <div className="flex lg:hidden items-center gap-2">
      <Link href={`/home/socials/user`} className="rounded-full overflow-hidden">
        <Avatar className="h-[2rem] w-[2rem]">
          {/* User Profile Image */}
          <AvatarImage
            className="object-cover rounded-full"
            src={user?.profilePicture}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
          
          {/* Fallback Avatar */}
            <AvatarFallback className="flex items-center justify-center font-bold text-xs shadow-lg">
              <div className="h-[2rem] w-[2rem] rounded-full overflow-hidden relative bg-gray-200">
                <Image
                  src={avatar}
                  alt='Default avatar'
                  fill
                  className="object-cover"
                  sizes="32px"
                  priority
                />
              </div>
            </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  )
}

/**
 * Headers Component
 * Handles navigation and layout for both Education and Social sections
 * Includes responsive design for mobile and desktop views
 */
const Headers: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<SectionType>(
    getInitialSection(pathname)
  );
  const [toggle, setToggle] = useState<boolean>(false);



  // Update section when route changes
  useEffect(() => {
    setSelectedSection(getInitialSection(pathname));
  }, [pathname]);

  const {user } = useAuthCheck({
    LoadingComponent: AuthSkeleton,
    requireAuth: false,
  });


  /**
   * Renders the social section sidebar
   * Desktop: Shows full navigation with profile options
   * Mobile: Shows only profile settings
   */
  const renderSocialsSidebar = () => {
    return (
      <div className="flex flex-col items-center justify-between mt-4 gap-4 p-4">
        {/* Navigation Links - Desktop Only */}
        <div>
          <div className="hidden sm:flex flex-col gap-2">
            {sectionNavLinks.Socials.map((link) => (
              <Link
                key={link.link}
                href={link.link}
                className={cn(
                  "flex items-center gap-4 p-2 px-3 rounded-md transition-colors",
                  "hover:bg-gray-100 dark:hover:bg-gray-800 ",
                  pathname === link.link && "text-white activeHover  bg-blue-600"
                )}
              >
                {link.icon}
                <span>{link.title}</span>
              </Link>
            ))}
          </div>

          
        </div>
        
        <div className='flex gap-2 flex-col' >
              {/*Desktop Profile */}
              <Link href={"/home/socials/user"} className="lg:flex hidden  items-center gap-2 hover:bg-gray-100  dark:hover:bg-gray-800 rounded-lg mb-2  p-1 ">
                <div className=" rounded-full overflow-hidden relative bg-gray-200">
                    <Avatar className="  ">
                      <AvatarImage
                        className=" object-cover rounded-full"
                        src={user?.profilePicture}
                        alt={`${user?.firstName} ${user?.lastName}`}
                      />
                        <AvatarFallback className="flex items-center justify-center  font-bold text-xs shadow-lg ">
                          <div className="h-[2rem] w-[2rem] rounded-full overflow-hidden relative bg-gray-200">
                            <Image
                                src={avatar}
                                alt='user'
                                fill
                                className="object-cover"
                                sizes="32px"
                                priority
                            />
                          </div>
                        </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className=' ' >
                      Profile
                  </div>
              </Link>

          <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg">
            <Star className="w-5 h-5" />
        
            <span>Go Premium</span>
          </button>
        </div>

      </div>
    );
  };

  /**
   * Handles section selection in dropdown
   * @param section Selected navigation section
   */
  const handleSectionClick = (section: SectionType): void => {
    setSelectedSection(section);
    setIsOpen(false);
  };

  /**
   * Toggles the section dropdown visibility
   */
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const renderSectionNav = (): React.ReactNode => {
    const links = sectionNavLinks[selectedSection.title];

    if (!links) return null;

    const formatNotificationCount = (count: number) => {
      return count > 99 ? "99+" : count.toString()
    }
  

    return (
      <>
      <div className="flex flex-col sm:hidden gap-2 mt-4">
        {/* Section-specific links */}
        { links.map((link: NavLink) => (
          <Link
            href={link.link}
            key={link.link}
            className={cn(
              "flex items-center gap-4 p-2 px-3 rounded-md transition-colors",
              "hover:bg-gray-100   dark:hover:bg-gray-800 ",
              pathname === link.link && "text-white activeHover  bg-blue-600"
            )}
          >
            {link.icon}
            <span>{link.title}</span>
            {link.notification && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {link.notification.count}
              </span>
            )}
          </Link>
        ))}

        {/* Divider */}
        <div className="border-t my-4" />

        {/* Profile-related links */}
        {profileLinks.map((link) => (
          <Link
            href={link.link}
            key={link.link}
            className={
              "flex items-center gap-4 p-2 px-3 rounded-md transition-colors hover:dark:bg-[#2F2F2F] hover:bg-gray-100"
            }
          >
            {link.icon}
            <span>{link.title}</span>
          </Link>
        ))}
      </div>


        {/* desktop navbar */}
        <section className=" sm:flex w-[500px] hidden px-4 flex-col justify-between mb-5 mt-8">
        <div className="w-full flex flex-col gap-5">
          {links.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className={cn(
                "flex items-center justify-between gap-4 p-2 px-3 rounded-md transition-colors",
                "hover:bg-gray-100  dark:hover:bg-gray-800",
                pathname === item.link && " text-white activeHover   bg-blue-600"
              )}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.title}</span>
              </div>
              {item.notification && item.notification.count > 0 && (
                <div className="flex items-center justify-center text-white bg-red-500 rounded-full min-w-7 h-7 px-2 text-xs">
                  {formatNotificationCount(item.notification.count)}
                </div>
              )}
            </Link>
          ))}
        </div>

        <button
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all"
        >
          <Star className="w-5 h-5" />
          <span>Go Premium</span>
        </button>
      </section>

      </>

    );
  };

  return (
    <>
      {/* Top Navigation and Desktop Sidebar */}
      <section className="relative">
        
        <nav className="fixed top-0 w-full z-[1000] bg-white dark:bg-[#0A0A0A] border-b">
          {/* Top navigation */}
          <nav className="w-full border-b z-[1000] justify-between flex items-center px-5 py-3 fixed h-[70px] bg-white dark:bg-[#0A0A0A]">
            <div className="flex items-center gap-3 justify-start">
              <Logo href="/home/education" />
              <button
                className="border rounded-md gap-2 p-[2px] px-2 flex items-center focus:outline-none"
                onClick={toggleDropdown}
              >
                <div>{selectedSection.title}</div>
                <ChevronsUpDown className='h-4 w-4' />
              </button>
            </div>

            <label className="input input-bordered sm:flex hidden bg-white dark:bg-[#0A0A0A] border border-gray-500 h-[34px] items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <Search className="h-4 w-4 text-gray-300" />
            </label>

            <div className='flex items-center gap-2'>
              <div className='sm:flex hidden'>
                <Auth />
              </div>
              <div className='flex sm:hidden border p-2 rounded-md'>
                <Search className='h-5 w-5' />
              </div>
              <ModeToggle />
              <button
                className="sm:hidden"
                onClick={() => setToggle((prev) => !prev)}
              >
                {toggle ? <X /> : <Menu />}
              </button>
            </div>
          </nav>

          {/* Section Selection Dropdown */}
          {isOpen && (
            <div className="  absolute top-[60px] z-[1000] flex flex-col justify-start left-[67px] w-[150px] p-1 border rounded-md bg-white dark:bg-[#0A0A0A] shadow-md">
              {sectionNavTitle.map((section: SectionType) => (
                <Link
                  href={section.link}
                  key={section.link}
                  className="cursor-pointer hover:bg-gray-100 flex justify-start items-center gap-2 hover:dark:bg-[#2F2F2F] rounded-md px-2 py-2"
                  onClick={() => handleSectionClick(section)}
                >
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Desktop Sidebar - Only show for education routes */}
        <aside className="hidden sm:flex fixed dark:bg-[#0A0A0A] bg-white w-56 h-screen pt-14 border-r">
          {isSocialsRoute(pathname) ? renderSocialsSidebar() : renderSectionNav()}
        </aside>

        {/* Mobile Sidebar - Only show for education routes */}
        {!isSocialsRoute(pathname) && toggle && (
          <>
            <section className="w-[60%] flex-col py-6 px-6 flex sm:hidden z-[100] right-0 border-l h-screen fixed pt-[5rem] bg-white dark:bg-[#0A0A0A]">
              <Auth />
              {renderSectionNav()}
            </section>
            <div
              onClick={() => setToggle(false)}
              className="w-full sm:hidden fixed h-screen z-[10] bg-gray-500 dark:bg-gray-900 opacity-85"
            />
          </>
        )}

        {/* Mobile Sidebar - Shows only profile settings for socials */}
        {toggle && (
          <>
            <section className="w-[60%] border-l flex-col py-6 px-6 flex sm:hidden z-[100] right-0 h-screen fixed pt-[5rem] bg-white dark:bg-[#0A0A0A]">
              <Auth />
              {isSocialsRoute(pathname) ? renderSocialsSidebar() : renderSectionNav()}
            </section>
          </>
        )}

        {/* Mobile Bottom Navigation - Only show for socials routes */}
        {isSocialsRoute(pathname) && (
          <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0A0A0A] border-t z-[1000]">
            <div className="flex justify-around items-center h-16">
              {sectionNavLinks.Socials.map((link) => (
                <Link
                  key={link.link}
                  href={link.link}
                  className={cn(
                    "flex flex-col items-center p-2",
                    isActiveRoute(pathname, link.link)
                      ? "text-blue-600 font-medium"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    isActiveRoute(pathname, link.link) && "bg-blue-50  dark:bg-blue-900/20"
                  )}>
                    {link.icon}
                  </div>
                  {/* <span className="text-xs mt-1">{link.title}</span> */}
                </Link>
              ))}
              
              {/* Profile */}
              <MobileProfile />
            </div> 
          </nav>
        )}
      </section>
    </>
  );
};

export default Headers;
