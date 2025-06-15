import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section className="flex-1 flex flex-col">
      {/* Header Skeleton */}
      <header className="h-[70px] border-b px-5 py-3 flex items-center justify-between bg-white dark:bg-[#0A0A0A]">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24 bg-zinc-300 dark:bg-zinc-800" />
          <Skeleton className="h-6 w-20 bg-zinc-300 dark:bg-zinc-800" />
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Skeleton className="h-8 w-40 bg-zinc-300 dark:bg-zinc-800" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full bg-zinc-300 dark:bg-zinc-800" />
          <Skeleton className="h-8 w-8 rounded-full bg-zinc-300 dark:bg-zinc-800" />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Skeleton */}
        <aside className=" sm:flex hidden  w-[300px] px-4 py-6 bg-white dark:bg-[#0A0A0A] border-r">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-6 w-6 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <Skeleton className="h-6 w-32 bg-zinc-300 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex-1 flex flex-col px-4">
          <div className="h-16" />
          <div className="flex-1 flex justify-center px-4">
            <div className="w-full max-w-[1200px] space-y-6">
              <div className="bg-zinc-100 dark:bg-[#121212] rounded-lg p-6">
                <Skeleton className="h-8 w-64 bg-zinc-300 dark:bg-zinc-800 mb-4" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48 bg-zinc-300 dark:bg-zinc-800" />
                    <Skeleton className="h-4 w-32 bg-zinc-300 dark:bg-zinc-800" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-zinc-100 dark:bg-[#121212] rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24 bg-zinc-300 dark:bg-zinc-800" />
                        <Skeleton className="h-8 w-16 bg-zinc-300 dark:bg-zinc-800" />
                      </div>
                      <Skeleton className="h-8 w-8 bg-zinc-300 dark:bg-zinc-800" />
                    </div>
                  </div>
                ))}
              </div>

              {[1, 2].map((i) => (
                <div key={i} className="bg-zinc-100 dark:bg-[#121212] rounded-lg p-6">
                  <Skeleton className="h-8 w-48 bg-zinc-300 dark:bg-zinc-800 mb-4" />
                  <div className="h-48 flex items-center justify-center">
                    <Skeleton className="h-4 w-64 bg-zinc-300 dark:bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Loading;

