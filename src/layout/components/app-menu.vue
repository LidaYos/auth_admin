<template>
    <AppLogo />
        <el-menu class="el-menu-container" :collapse="isCollapse" background-color="#fff" active-color="#ecf5ff" router :default-active="defaultActive">
            <MenuItem v-for="item in treeData" :menusList="item" />
        </el-menu>
</template>
  
<script lang="ts" setup>
import MenuItem from "./app-menu-item.vue"
import AppLogo from "./app-logo.vue"

import { useList } from "@/stores/user"
import { getTreeList } from "@/utils/getTreeList";
import { ref, computed, onActivated } from 'vue';
import { useRoute } from "vue-router";

// 左侧菜单根据url路径选中
const router = useRoute()
const defaultActive = ref(router.fullPath)
onActivated(() => {

})
const store = useList()

// 自定义左菜单风格
const isCollapse = computed(() => {
    return store.isCollapse
})

// 用于渲染的数据
const treeData = computed(() => {
    // 过滤掉按钮
    const newMenu = store.menus?.filter((item: any) => item.type !== 2) as any
    return getTreeList(newMenu)
})

</script>

<style lang="scss" scoped>

.el-menu-container:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100vh);
}

.el-menu {
    border-right: none;

    :deep(.el-sub-menu__title) {
        height: 50px;
    }

    &.el-menu--collapse {
        :deep(.title) {
            width: 0;
            height: 0;
            visibility: hidden;
        }
    }
}

:deep(.el-menu-item.is-active) {
    background-color: #ecf5ff !important;
    position: relative;
}

:deep(.el-menu-item.is-active)::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background-color: #409eff;
}
</style>