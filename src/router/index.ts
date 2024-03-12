import storage from "@/utils/storage";

import { useList } from "@/stores/user";

// 顶部进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import {
  type RouteLocationNormalized,
  createRouter,
  createWebHashHistory,
} from "vue-router";

const Router = import.meta.glob([
  "../views/**/**.vue",
  "!../views/**/components",
  "!../views/login/**",
]);

// 路由信息
const modules: any[] = [];
for (let key in Router) {
  const newKey = key.replace("../views", "").replace(".vue", "");
  modules[newKey] = Router[key];
}

console.log(modules);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/layout/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/errors/404.vue"),
    },
  ],
});

// 路由守卫
// 白名单，不用登录也可以访问
const whiteName = ["login"];

NProgress.configure({
  easing: "ease-out",
});

router.beforeEach(async (to: RouteLocationNormalized): any => {
  NProgress.start();

  // 获取token
  const token = storage.get("token");

  // 不是白名单
  if (!whiteName.includes(to.name as string)) {
    // 没有登录
    if (!token) {
      return { name: "login", query: { redirect: to.fullPath } };
    }

    // 没有用户信息
    const store = useList();
    if (!store.info) {
      // 这里获取数据。res数据，由userList return得
      const createdRoutes = await store.userList();
      // 动态生成路由
      createdRoutes.forEach(item => {
        // 生成
        router.addRoute("index", {
          path: item.router,
          name: item.router.split("/").join("-").substr(1),
          component: modules[item.router],
        });
      });
      return to.fullPath;
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

// 重置路由，将动态路由删除
router.reset = () => {
  const store = useList();
  store.authRoutes.forEach(item => {
    const name = item.router.split("/").join("-").substr(1);
    router.removeRoute(name);
  });
};

export default router;
