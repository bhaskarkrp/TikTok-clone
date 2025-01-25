import { usePathname } from "next/navigation";
import React from "react";
import TopNav from "./includes/TopNav";
import SideNav from "./includes/SideNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <>
      <TopNav />
      <div
        className={`flex justify-between mx-auto w-full lg:px-2.5 px-0 ${
          pathName === "/" ? "max-w-[1140px]" : ""
        }`}
      >
        <SideNav />
        {children}
      </div>
    </>
  );
}
