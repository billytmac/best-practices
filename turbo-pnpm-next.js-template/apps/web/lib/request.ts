import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { clearAllToast, showFailToast } from "./toast";
// 兜底错误码
import { NETWORK_ERROR_TEXT } from "@workspace/lib/errorCode";
// 兜底错误码（可选）
import { COMMON_ERROR_CODE } from "./errorCode";

// 获取环境变量的辅助函数
function getBaseURL(): string {
  // 在 Next.js 中，环境变量在服务端和客户端的访问方式不同
  if (typeof window === "undefined") {
    // 服务端
    return process.env.NEXT_PUBLIC_API_BASE_URL || "";
  }
  // 客户端 - Next.js 会在构建时替换 process.env.NEXT_PUBLIC_* 变量
  return process.env.NEXT_PUBLIC_API_BASE_URL || "";
}
console.log(getBaseURL(), "getBaseURL");

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: getBaseURL(),
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可放一些公共参数
    // const commonParams = {
    // };
    if (config.method === "get") {
      config.params = {
        // ...commonParams,
        ...config.params,
      };
    } else {
      config.data = {
        // ...commonParams,
        ...config.data,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("请求错误：", error);
    return Promise.reject(error);
  },
);

// Add a response interceptor
request.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response, "response");
    const { code, msg } = response?.data || {};
    if (code === 200) {
      return response.data;
    } else {
      showFailToast(
        COMMON_ERROR_CODE[code as keyof typeof COMMON_ERROR_CODE] || msg,
      );
      return Promise.reject(response.data);
    }
  },
  (error: AxiosError) => {
    console.error("响应错误：", error?.response);
    const errorResponse = error?.response || ({} as any);
    const url = errorResponse?.config?.url;
    console.log(url, "url");
    clearAllToast();
    const { code, msg } = errorResponse?.data || {};
    showFailToast(
      COMMON_ERROR_CODE[code as keyof typeof COMMON_ERROR_CODE] ||
        msg ||
        NETWORK_ERROR_TEXT,
    );
    return Promise.reject(error);
  },
);

export default request;
