import http from "@/utils/request";

// 用户信息
export const getUserList = () => {
    return http.get("/admin/base/comm/person");
  }