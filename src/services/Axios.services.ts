// The issue with your Axios configuration is that setting the Access-Control-Allow-Origin header in the client's request (your Axios instance) does not resolve CORS issues. The Access-Control-Allow-Origin header should be set on the server that you are making requests to, not on the client side.
import axios from "axios";

class AxiosService {
  public instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  public secureInstance = (token: string) =>
    axios.create({
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
}

const axiosServiceInstance = new AxiosService();
export default axiosServiceInstance;
