import http from "@/utils/request";

// 验证码
export type ICaptcha = { captchaId: string; data: string };
export const getCaptcha = () => {
  return http.get<ICaptcha>("/admin/base/open/captcha");
};

// 登录
export type Iuser = {
  username: string;
  password: string;
  verifyCode: string;
};

// 登录返回值
export type Itoken = {
  token: string;
  expire: number;
  refreshToken: string;
  refreshExpire: number;
};

export const getLogin = (data: Iuser) => {
  return http.post<Itoken>("/admin/base/open/login", data);
};

// 登出
export const getLogout = () => {
  return http.post("/admin/base/comm/logout");
};

// 刷新token
export const setRefreshToken = (refreshToken: string) => {
  return http.get<Itoken>(`/admin/base/open/refreshToken?refreshToken=${refreshToken}`);
}
