import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";

// 自定义指令
import { focus } from "@/directive/focus"

// ElementPlus 按需导入时，针对一些反馈组件，需要单独导入样式
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";

import router from "@/router";
// pinia持久化插件
import persisted from "pinia-plugin-persistedstate";

// element图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import RightToolbar from "@/components/RightToolbar/index.vue"

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
// 自定义指令
app.directive("focus", focus);

// 全局组件
app.component("RightToolbar", RightToolbar)

// 使用持久化
pinia.use(persisted);
// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.mount("#app");
