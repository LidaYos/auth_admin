<template>
  <div class="page-layout">
    <div class="page-layout__left">
      <AppMenu />
    </div>
    <div class="page-layout__right">
      <div class="page-layout__top">
        <AppHeader />
      </div>
      <div class="page-layout__tab">
        <AppTab />
      </div>
      <div class="page-layout__container">
        <div class="content">
          
            <RouterView />

        </div>
      </div>
      <div class="page-layout__foot"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "@/layout/components/app-header.vue";
import AppMenu from "@/layout/components/app-menu.vue";
import AppTab from "@/layout/components/app-tab.vue";

import { onMounted, onUnmounted } from "vue";
import { FullScreenSetting } from "@/stores/fullscreen";

// pinia仓库
const full = FullScreenSetting();

const keyDown = (event: any) => {
  if (event.keyCode === 122) {
    event.returnValue = false;
    full.requestFull(); //触发全屏的按钮
  }
};

onMounted(() => {
  window.addEventListener("keydown", keyDown, true);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keyDown, true);
});
</script>

<style lang="scss" scoped>
.page-layout {
  position: relative;
  height: 100%;
  display: flex;
  background-color: #e4e7ed;
  overflow: hidden;

  &__left {
    height: 100%;
    background-color: #fff;
  }

  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 2px;
    min-width: 300px;
  }

  &__top {
    height: 50px;
    background-color: #fff;
    margin-bottom: 2px;
  }

  &__container {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    background-color: #eff0f2;
    display: flex;

    .content {
      background-color: #fff;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
      // 需要完成这里
      // flex: 1;
      height: 100%;
      width: 100%;
      margin-bottom: 25px;
      display: flex;
      justify-content: start;
      align-items: start;
      overflow: auto;
    }
  }

  &__tab {
    width: 100%;
    height: 40px;
    background-color: #ffffff;
  }

  &__foot {
    // position: absolute;
    // bottom: 0;
    height: 25px;
    width: 100%;
    background-color: #fff;
  }
}
</style>
