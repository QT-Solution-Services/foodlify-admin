import React, { useContext, useState, useEffect } from "react";
import AppNav from "./AppNav";
import Sidebar from "./Sidebar";
import { AppLayoutProps } from "@/interfaces/ui";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { ToastContext } from "@/contexts/ToastContext";
import CookieService from "@/services/Cookies.services";
import useLogout from "@/hooks/useLogout";
import useAuthentication from "@/hooks/useAuthentication";

function AppLayout({ children, pageTitle }: AppLayoutProps) {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const { userData } = useContext(AuthContext);
  const { handleLogout } = useLogout();
  const { ping } = useAuthentication();

  useEffect(() => {
    if (userData === null && typeof window !== "undefined") {
      handleLogout();
    }
    const checkSession = async () => {
      // trying to validate token from server
      const pingRes = await ping();
      if (pingRes === false) {
        handleLogout();
        // showToast("error", "Your session has expired. Please log in again.");
      }
    };
    checkSession();
  }, []);

  return (
    <div className="flex h-full ">
      <Sidebar />
      <div className="flex grow flex-col">
        <AppNav pageTitle={pageTitle} />
        <main className="h-full bg-stone-50 px-16 pt-12">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
