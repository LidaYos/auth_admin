/**
 * 这里封装axios请求
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

import { ElMessage } from "element-plus";

import storage from "@/utils/storage";

import { useList } from "@/stores/user";

import router from "@/router";

import { setRefreshToken } from "@/api/login";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 1000 * 10,
};

// 请求队列
let queue: any[] = [];
// 是否正在刷新token
let isRefreshing = false;

class RequestHttp {
  server: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.server = axios.create(config);

    // 请求拦截器
    this.server.interceptors.request.use(
      config => {
        // 获取token
        const token = storage.get("token");
        // 获取refreshToken
        const refreshToken = storage.get("refreshToken");

        // 是否有token，是否有 refreshToken
        // config.url。通过刷新token接口调用 携带refreshToken。
        if (token && !config.url?.includes("refreshToken")) {
          // 1. 有token需要判断token是否过期
          if (storage.isExpired("token")) {
            // 1.1 token过期了，那refreshToken过期了吗
            if (storage.isExpired("refreshToken")) {
              // 都过期了;直接让发出
              return config;
            }

            // 没有在刷新token，可以执行进去
            if (!isRefreshing) {
              isRefreshing = true;
              // 1.2 refreshToken没过期，调用刷新token接口
              setRefreshToken(refreshToken).then(res => {
                queue.forEach(cd => {
                  // 这里res获取到token
                  // console.log("调用刷新token", res);
                  cd(res.token);
                });
                // 清空队列
                queue = [];
                // 重置状态
                isRefreshing = false;
                // 重置本地缓存的token
                storage.set("token", res.token, res.expire);
              });
            }

            // 1.3.返回一个Promise，让当前请求暂停发出
            return new Promise(resolve => {
              // 存放一个请求方法，刷新token用【刷新token的请求配置】
              queue.push((newToken: string) => {
                // 这里newToken 由上面cd接收传过来
                // 用户信息需要请求头 = token
                config.headers.Authorization = newToken;
                resolve(config);
              });
            });
          }
          config.headers.Authorization = token;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.server.interceptors.response.use(
      response => {
        const result = response.data;
        // 业务判断
        if (result.code !== 1000) {
          // 失败
          ElMessage({
            type: "warning",
            message: result.message || "网络异常，请稍后重试！",
          });
          return Promise.reject(result);
        }
        // 成功
        return result.data;
      },
      error => {
        if (error.response) {
          // http状态码
          const { status } = error.response;
          // 状态判断
          switch (status) {
            // token过期
            case 401:
              ElMessage.error("登录失效，请重新登录~");
              // 路由重置
              router.reset();
              // 清理store
              const store = useList();
              store.clearState();
              // 回到登录页面
              router.replace("/login");
              return;
            default:
              break;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // get请求
  get<T>(url: string, parmas?: any): Promise<T> {
    return this.server.get(url, { parmas });
  }

  // post请求
  post<T>(url: string, parmas?: any): Promise<T> {
    return this.server.post(url, parmas);
  }
}

export default new RequestHttp(config);
