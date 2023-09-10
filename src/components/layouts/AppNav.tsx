import { AppNavProps } from "@/interfaces/ui";
import React from "react";

function AppNav({ pageTitle = "default title" }: AppNavProps) {
  return (
    <div className="flex justify-between border-b-2 border-stone-200 items-center h-16 px-8 ">
      <h2 className="font-medium capitalize text-lg min-w rounded-full bg-yellow-100 px-6  text-yellow-800">
        {pageTitle}
      </h2>
      <input
        type="text"
        name=""
        placeholder="oder #id"
        className="input  transition-all duration-300  w-40 focus:w-60 "
      />
    </div>
  );
}

export default AppNav;
