import { useContext, useState } from "react";

// import { useRouter } from 'next/router'

import { AxiosResponse } from "axios";
import AxiosService from "@/services/Axios.services";
import { AuthContext } from "@/contexts/AuthContext";
import { ToastContext } from "@/contexts/ToastContext";
// import useLogout from './useLogout'

interface dataInterface {
  data?: any;
  token?: string;
  url?: string;
  showError?: boolean;
}
interface noDataInterface {
  token?: string;
  url?: string;
  showError?: boolean;
}
interface ResponseInterface {
  success: boolean;
  message: string;
  data: any;
}

function apiRes(success: boolean, message: string, data: any) {
  return {
    success,
    message,
    data,
  };
}

export default function useSecureRequest(url: string = "") {
  // const { handleLogout } = useLogout()

  const { showToast } = useContext(ToastContext);

  const [loading, setLoading] = useState(false);

  const throwError = (message: string) => {
    showToast("error", message);
  };

  const handleErrors = async (
    response: AxiosResponse,
    showError: boolean,
  ): Promise<ResponseInterface> => {
    const errorMessage = response?.data?.message
      ? response.data.message
      : "Unknown error";

    if (response?.status && response?.data?.message === "jwt expired") {
      // showError && throwError('Sorry, your session has expired.')
      showToast("warn", "session expired");
      // showError && throwError(errorMessage)
    } else {
      showError && throwError(errorMessage);
    }
    return apiRes(false, errorMessage, null);
  };

  // * The function that gets the user's token from the cookie storage
  const { token: accessToken } = useContext(AuthContext);

  const post = async ({
    data = {},
    token = "",
    url: passedUrl = "",
    showError = true,
  }: dataInterface = {}): Promise<ResponseInterface> => {
    let resolvedToken: string = token ? token : accessToken;
    if (!resolvedToken) {
      // return apiRes(false, 'Login token no found!', null)
      resolvedToken = "";
    }
    const resolvedUrl = passedUrl ? passedUrl : url;

    try {
      // * Request starts
      setLoading(true);
      const response = await AxiosService.secureInstance(resolvedToken)({
        method: "POST",
        url: `${resolvedUrl}`,
        data,
      });
      setLoading(false);

      // * extract message from response
      let msg: string = response?.data?.message || "Success";

      // * respond if api request response was a success
      if (response.status >= 200 && response.status <= 299) {
        return apiRes(
          true,
          msg,
          response.data.data ? response.data.data : response.data,
        );
      }
      // * respond if api request response was not
      // console.log('why')

      return await handleErrors(response, showError);
    } catch (err: any) {
      setLoading(false);
      // * Error handling

      return await handleErrors(err?.response, showError);
    }
  };

  const get = async ({
    token = "",
    url: passedUrl = "",
    showError = true,
  }: noDataInterface = {}): Promise<ResponseInterface> => {
    let resolvedToken: string = token ? token : accessToken;
    // if (!resolvedToken) {
    // 	return apiRes(false, 'Login token undefined or null!', null)
    // }
    const resolvedUrl = passedUrl ? passedUrl : url;

    try {
      // * Request starts
      setLoading(true);
      const response = await AxiosService.secureInstance(resolvedToken)({
        method: "GET",
        url: `${resolvedUrl}`,
      });

      setLoading(false);

      // * extract message from response
      let msg: string = response?.data?.message || "Success";

      // * respond if api request response was a success
      if (response.status >= 200 && response.status <= 299) {
        return apiRes(
          true,
          msg,
          response.data.data ? response.data.data : response.data,
        );
      }

      // * respond if api request response was not
      return handleErrors(response, showError);
    } catch (err: any) {
      setLoading(false);
      // * Error handling
      return handleErrors(err?.response, showError);
    }
  };

  //   remaining method
  const deleteReq = async ({
    data = {},
    token = "",
    url: passedUrl = "",
    showError = true,
  }: dataInterface = {}): Promise<ResponseInterface> => {
    let resolvedToken: string = token ? token : accessToken;
    if (!resolvedToken) {
      resolvedToken = "";
    }
    const resolvedUrl = passedUrl ? passedUrl : url;

    try {
      // * Request starts
      setLoading(true);
      const response = await AxiosService.secureInstance(resolvedToken)({
        method: "DELETE",
        url: `${resolvedUrl}`,
        data,
      });
      setLoading(false);

      // * extract message from response
      let msg: string = response?.data?.message || "Success";

      // * respond if api request response was a success
      if (response.status >= 200 && response.status <= 299) {
        return apiRes(
          true,
          msg,
          response.data.data ? response.data.data : response.data,
        );
      }

      // * respond if api request response was not
      return await handleErrors(response, showError);
    } catch (err: any) {
      setLoading(false);
      // * Error handling
      return await handleErrors(err?.response, showError);
    }
  };

  const patch = async ({
    data = {},
    token = "",
    url: passedUrl = "",
    showError = true,
  }: dataInterface = {}): Promise<ResponseInterface> => {
    let resolvedToken: string = token ? token : accessToken;
    if (!resolvedToken) {
      resolvedToken = "";
    }
    const resolvedUrl = passedUrl ? passedUrl : url;
    try {
      // * Request starts
      setLoading(true);
      const response = await AxiosService.secureInstance(resolvedToken)({
        method: "PATCH",
        url: `${resolvedUrl}`,
        data,
      });
      setLoading(false);

      // * extract message from response
      let msg: string = response?.data?.message || "Success";

      // * respond if api request response was a success
      if (response.status >= 200 && response.status <= 299) {
        return apiRes(
          true,
          msg,
          response.data.data ? response.data.data : response.data,
        );
      }

      // * respond if api request response was not
      return await handleErrors(response, showError);
    } catch (err: any) {
      setLoading(false);
      // * Error handling
      return await handleErrors(err?.response, showError);
    }
  };

  const put = async ({
    data = {},
    token = "",
    url: passedUrl = "",
    showError = true,
  }: dataInterface = {}): Promise<ResponseInterface> => {
    let resolvedToken: string = token ? token : accessToken;
    if (!resolvedToken) {
      resolvedToken = "";
    }
    const resolvedUrl = passedUrl ? passedUrl : url;
    try {
      // * Request starts
      setLoading(true);
      const response = await AxiosService.secureInstance(resolvedToken)({
        method: "PUT",
        url: `${resolvedUrl}`,
        data,
      });
      setLoading(false);

      // * extract message from response
      let msg: string = response?.data?.message || "Success";

      // * respond if api request response was a success
      if (response.status >= 200 && response.status <= 299) {
        return apiRes(
          true,
          msg,
          response.data.data ? response.data.data : response.data,
        );
      }

      // * respond if api request response was not
      return await handleErrors(response, showError);
    } catch (err: any) {
      setLoading(false);
      // * Error handling
      return await handleErrors(err?.response, showError);
    }
  };

  return {
    post,
    get,
    patch,
    put,
    deleteReq,
    loading,
    throwError,
  };
}
