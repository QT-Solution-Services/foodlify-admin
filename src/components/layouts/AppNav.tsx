import { AppNavProps } from "@/interfaces/ui";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";
import useLogout from "@/hooks/useLogout";

function AppNav({ pageTitle = "default title", SeachType }: AppNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-16 items-center justify-between border-b-2 border-stone-200 px-8 ">
      <h2 className="min-w rounded-full bg-yellow-100 px-6 text-lg font-medium capitalize  text-yellow-800">
        {pageTitle}
      </h2>
      {SeachType}

      <Image
        src="/hamburger.svg"
        width={50}
        height={50}
        alt="hamburger-icon"
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden"
      />

      {/* for mobile */}
      <MoblieSidebar isOpen={isOpen} />
    </div>
  );
}

export default AppNav;

function MoblieSidebar({ isOpen }) {
  const { handleLogout } = useLogout();
  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-48 transform bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar content */}

      <ul className="mt-8">
        <li className="mb-2">
          <a href="#" className="block p-2 hover:bg-gray-100">
            others
          </a>
        </li>
        <Button
          type="medium"
          bgc="bg-red-300"
          onClick={handleLogout}
          className="mt-4 w-full hover:bg-red-400"
        >
          Logout
        </Button>
      </ul>
    </div>
  );
}
