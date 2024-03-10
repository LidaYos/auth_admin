/**
 * 用户相关
 */
import { getLogin, getLogout, type Itoken } from "@/api/login";
import { getUserList } from "@/api/user";
import { defineStore } from "pinia";
import storage from "@/utils/storage";

type IuserList = {
  expire: string;
  refreshExpire: string;
  refreshToken: string;
  token: string;
};

export type Info = {
  createTime: string;
  email: string;
  headImg: string;
  id: number;
  name: string;
  nickName: string;
  passwordV: number;
  phone: string;
  remark: string;
  socketId: number | string | null;
  status: number;
  updateTime: string;
  username: string;
};
export interface MenuObj {
  id: number;
  createTime: string;
  icon: string;
  inShow: number;
  keepAlive: number;
  name: string;
  orderNum: number;
  parentId: string | number | null;
  prems: string | number | null;
  router: string;
  type: number;
  updateTime: string;
  viewPath: string | number | null;
  children?: any;
}
export type Menus = [MenuObj[]];

export const useList = defineStore("user-list", {
  state() {
    return {
      // 获取token
      token: storage.get("token") || "",
      // 用户信息
      info: null as unknown as Info,
      // 用户菜单
      menus: [] as unknown as Menus,
      // 用户的口味
      isCollapse: storage.get("isCollapse") || false,
    };
  },
  getters: {
    authRoutes(state) {
      return state.menus?.filter(item => item.type === 1);
    },
  },
  actions: {
    // token刷新
    loginApi(list: Itoken) {
      storage.set("token", list.token, list.expire);
      // storage.set("token", list.token, 5);
      storage.set("refreshToken", list.refreshToken, list.refreshExpire);
      // storage.set("refreshToken", list.refreshToken, 10);
      this.token = list; // token
    },

    // 退出登录
    async logoutApi() {
      await getLogout();
      // 清空state
      this.clearState();
    },

    clearState() {
      this.info = null;
      this.menus = [];
      this.token = null;
    },

    // 用户信息
    async userList() {
      const { info, menus } = (await getUserList()) as {
        info: Info;
        menus: Menus;
      };
      (this.info as unknown as Info) = info;
      (this.menus as unknown as Menus) = menus;

      // 组装好返回，动态路由需要.type = 1
      return menus.filter(item => item.type === 1);
    },

    // 切换菜单风格
    CutStyle(payload: boolean) {
      storage.set("isCollapse", payload);
      this.isCollapse = payload;
    },
  },
  // 持久化
  // persist: {
  //   key: {
  //     token: "token",
  //     isCollapse: "isCollapse",
  //   }, //存储名称
  //   paths: ["token", "isCollapse"],
  // },
});
