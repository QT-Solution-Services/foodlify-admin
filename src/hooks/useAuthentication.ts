import { useRouter } from "next/router";
import useSecureRequest from "./useRequest";
import { useContext, useState } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { AuthContext } from "@/contexts/AuthContext";
import { LoginFormProps } from "@/interfaces/ui";
import { loginRoute, resturantsRoute, usersRoutes } from "@/constant/apiRoutes";

export default function useAuthentication() {
  const { post, get, put } = useSecureRequest();

  const { showToast } = useContext(ToastContext);

  const { setAuthToken, setAdminDetails } = useContext(AuthContext);

  const [reqLoading, setReqLoading] = useState(false);

  const tk =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBmb29kbGlmeS5jb20ubmciLCJpYXQiOjE2OTQzMjY1NzAsImV4cCI6MTY5NjkxODU3MH0.bEnRVEyqOrbRGOLdwMGSgYQB15MYj8AHK9QRQvjh";

  const router = useRouter();

  function extractAdminData(data: any) {
    const { body, message } = data || {};
    const { access_token: token, refresh_token: refreshToken } = body || {};
    const adminData = { refreshToken, message };
    setAuthToken(token);
    setAdminDetails(adminData);
  }

  const handleLoginWithForm = async (data: LoginFormProps) => {
    setReqLoading(true);
    try {
      showToast("warn", "processing request...");
      const res = await post({ data, url: loginRoute });
      if (res.success) {
        extractAdminData(res.data);
        router.push("/dashboard");
      }
    } catch (err) {
      throw err;
    } finally {
      setReqLoading(false);
    }
  };
  const fetchResutrants = async () => {
    try {
      const res = await get({ url: resturantsRoute });
      if (res.success) {
        return res.data;
      }
    } catch (err) {
      throw err;
    }
  };

  const fetchUsers = async () => {
    try {
      setReqLoading(true);
      const res = await get({ url: usersRoutes });
      if (res.success) {
        return res.data;
      }
    } catch (err) {
      throw err;
    } finally {
      setReqLoading(false);
    }
  };

  const ping = async () => {
    const res = await get({ url: resturantsRoute });
    return res.success ? true : false;
  };

  return {
    handleLoginWithForm,
    reqLoading,
    fetchResutrants,
    fetchUsers,
    ping,
  };
}
