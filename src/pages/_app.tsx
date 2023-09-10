import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ToastContextProvider from "@/contexts/ToastContext";
import { AuthProvider } from "@/contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ResturantProvider } from "@/contexts/ResturantsContext";
import { DashbaordProvider } from "@/contexts/DashboardContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DashbaordProvider>
        <ResturantProvider>
          <ToastContextProvider>
            <Component {...pageProps} />
          </ToastContextProvider>
        </ResturantProvider>
      </DashbaordProvider>
    </AuthProvider>
  );
}
