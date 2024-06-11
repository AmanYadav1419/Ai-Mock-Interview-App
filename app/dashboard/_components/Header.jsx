"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      {/* Application logo */}
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />

      {/* middle section  */}
      <ul className="hidden md:flex g-6">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path == "/dashboard" && "text-primary font-bold"}
            `}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path == "/dashboard/questions" && "text-primary font-bold"}
            `}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path == "/dashboard/upgrade" && "text-primary font-bold"}
            `}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path == "/dashboard/how" && "text-primary font-bold"}
            `}
        >
          How it Works?
        </li>
      </ul>

      <UserButton />
    </div>
  );
};

export default Header;