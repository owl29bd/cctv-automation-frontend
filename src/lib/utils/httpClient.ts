import { APIUrl } from "@/lib/constants/url.config";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./authOptions";

async function getAccessToken() {
  if (typeof window === "undefined") {
    const session = await getServerSession(authOptions);

    return session?.tokens?.accessToken;
  }

  const session = await getSession();

  return session?.tokens?.accessToken;
}

const httpClient = axios.create({
  baseURL: APIUrl.base + "/api",
  withCredentials: true,
});

export const httpClientWithoutToken = axios.create({
  baseURL: APIUrl.base + "/api",
  withCredentials: true,
});

// const refreshTokenInterceptor = async (err: AxiosError) => {
//   const originalConfig = err.config;

//   if (
//     err.response?.status === 401 &&
//     !originalConfig?.headers["skip-interceptor"] &&
//     !originalConfig?.url?.includes("/auth/")
//   ) {
//     try {
//       originalConfig!.headers["skip-interceptor"] = true;

//       await authService.refreshAccessToken();

//       return httpClient(originalConfig!);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }
//   return Promise.reject(err);
// };

// httpClient.interceptors.response.use((res) => res, refreshTokenInterceptor);

httpClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default httpClient;
