import { AppLayoutProps, SideLinkProps } from "@/interfaces/ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../Button";
import useLogout from "@/hooks/useLogout";

function Sidebar() {
  const { handleLogout } = useLogout();
  return (
    <div className="w-[350px] border-r-2 border-stone-200 bg-stone-50/50 px-14 py-12">
      <>
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        <h2 className="mt-[-] text-center font-semibold ">
          Foodlify Resturants
        </h2>
        <ul className="my-12 flex flex-col items-center justify-center">
          <SideLink to="/dashboard">Dashboard</SideLink>
          <SideLink to="/users">Users</SideLink>
          <SideLink to="/resturants">Resturants</SideLink>
          <SideLink to="/orders">Orders</SideLink>
          <SideLink to="/transactions">Transaction</SideLink>
          <Button
            type="big"
            bgc="bg-red-300"
            onClick={handleLogout}
            className="mt-4 hover:bg-red-400"
          >
            Logout{" "}
          </Button>
        </ul>
      </>
    </div>
  );
}

export default Sidebar;

function SideLink({ children, to }: SideLinkProps) {
  return (
    <Link href={to} className="mx-auto">
      <Button
        type="medium"
        bgc="bg-yellow-100"
        className="mb-4 w-40 hover:bg-yellow-200"
      >
        {children}
      </Button>
    </Link>
  );
}
