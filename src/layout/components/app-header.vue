<template>
  <div class="page">
    <div class="page__left">
      <!-- 展开/收起 -->
      <el-icon v-if="isOpen">
        <Grid @click="handleColl(!isCollapse)" />
      </el-icon>
      <el-icon v-else>
        <Menu @click="handleColl(!isCollapse)" />
      </el-icon>

      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in breadcrumb"
          :key="item.id"
          :to="item.router"
        >
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="page__right">
      <el-icon v-if="fullState">
        <Aim @click="fullScreen" />
      </el-icon>
      <el-icon v-else>
        <FullScreen @click="fullScreen" />
      </el-icon>

      <span>{{ userInfo?.name }}</span>
      <el-dropdown>
        <el-avatar :src="userInfo?.headImg" />

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleRouteClear"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Info, useList } from "@/stores/user";
import { ElMessageBox } from "element-plus";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { getMenusById } from "@/utils/getTreeList.ts";
import { FullScreenSetting } from "@/stores/fullscreen";

const router = useRouter();
const store = useList();
const full = FullScreenSetting();

// 全屏切换
const fullScreen = () => {
  full.fullScreen();
};

// 全屏状态
const fullState = computed(() => {
  return full.isFull;
});

// 控制仓库的 isCollapse
const handleColl = (pay: boolean) => {
  store.CutStyle(pay);
};
const isCollapse = computed(() => {
  return store.isCollapse;
});

// 面包屑
const breadcrumb = computed(() => {
  // 按钮权限
  const menus: any = store.menus;
  // 从权限中，找到与当前路由路径匹配的
  const menu = menus?.find(
    (item: any) => item.router === router.currentRoute.value.path
  );
  // 不存在 或者在首页，则显示 首页
  if (!menu || menu.name === "首页") {
    return [{ id: 0, name: "首页", router: "/useHome/home" }];
  }
  // 存在的话，组成需要的形式 返回
  const id = menu.id;
  const list = getMenusById(menus, id);
  // 在前面 添加一个首页
  list.unshift({ id: 0, name: "首页", router: "/useHome/home" });
  return list;
});

// 判断展开/收缩
const isOpen = computed(() => {
  return store.isCollapse;
});

// 用于数据渲染
const userInfo = computed<Info>(() => {
  return store.info;
});

// 点击退出登录
const handleLogout = () => {
  ElMessageBox.confirm("确定退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    // 清除路由
    router.reset();
    // 退出登录
    store.logoutApi();
    router.replace("/login");
  });
};

// 删除动态路由调试
const handleRouteClear = () => {
  router.reset();
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  &__left {
    display: flex;
    align-items: center;
    height: 100%;

    svg,
    .el-icon {
      width: 50px;
      height: 75%;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    background-color: #ffffff;
    z-index: 999;
    margin-right: 25px;

    span {
      margin: 0 5px 0 5px;
    }
  }

  .el-avatar {
    margin-left: 10px;
    border: 1px solid pink;
  }
}

:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
.el-icon {
  cursor: pointer;
  margin-right: 10px;
  font-size: 22px;
}
</style>
