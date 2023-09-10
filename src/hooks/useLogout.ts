import { AuthContext } from "@/contexts/AuthContext";
import CookieService from "@/services/Cookies.services";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function useLogout() {
  const router = useRouter();
  const { setAuthToken, setAdminDetails } = useContext(AuthContext);
  const handleLogout = async () => {
    CookieService.remover("app_session");
    CookieService.remover("user_data");
    setAuthToken("");
    setAdminDetails(null);
    router.push("/");
  };
  return {
    handleLogout,
  };
}
