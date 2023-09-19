import Link from "next/link";
import React from "react";
import Image from "next/image";
import { NavItemProps } from "@/interfaces/ui";

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 block bg-stone-50  md:hidden">
      <ul className="flex justify-between  text-sm">
        <BottomNavItem to="/dashboard" imgsrc="/dashboard.svg">
          dashboard
        </BottomNavItem>
        <BottomNavItem to="/users" imgsrc="/users.svg">
          users
        </BottomNavItem>
        <BottomNavItem to="/resturants" imgsrc="/restaurant.svg">
          restaurants
        </BottomNavItem>
        <BottomNavItem to="/orders" imgsrc="/orders.svg">
          orders
        </BottomNavItem>
        <BottomNavItem to="/transactions" imgsrc="/transaction.svg">
          transaction
        </BottomNavItem>
      </ul>
    </nav>
  );
}

export default BottomNav;

function BottomNavItem({ to, imgsrc, children }: NavItemProps) {
  return (
    <Link href={to}>
      <button className="flex flex-col items-center justify-center px-1 py-2 focus:bg-yellow-100 focus:outline-none">
        <Image src={imgsrc} width={30} height={30} alt="icon" />
        {children}
      </button>
    </Link>
  );
}
