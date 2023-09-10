import Cookies from "js-cookie";

export default class CookieService {
  static setter(key: string, data: any, options: any = { expires: 7 }) {
    try {
      if (typeof window !== "undefined") {
        let savedData = JSON.stringify(data);
        Cookies.set(key, savedData, { ...options });
        return true;
      } else {
        return false;
      }
    } catch (_: any) {
      return false;
    }
  }

  static getter(key: string) {
    if (!key) return undefined;
    try {
      if (typeof window !== "undefined") {
        let data = Cookies.get(key);
        data = JSON.parse(data as any);
        // console.log(data)
        return data;
      } else {
        return false;
      }
    } catch (_: any) {
      return undefined;
    }
  }

  static remover(key: string | string[], options?: any) {
    if (!key) return false;
    try {
      if (typeof window !== "undefined") {
        if (Array.isArray(key)) {
          key.map((singleKey: string) => {
            if (typeof singleKey === "string")
              Cookies.remove(singleKey, { ...options });
          });
        } else {
          Cookies.remove(key);
        }
        return true;
      } else {
        return false;
      }
    } catch (_: any) {
      return false;
    }
  }
}
