<!-- 
    有子级 el-sub-menu
    无子级 el-menu-item
 -->
<template>
  <el-sub-menu v-if="isChildren" :index="menusList?.name">
    <template #title>
      <el-icon>
        <component :is="menusList.icon"></component>
      </el-icon>
      <div class="title">
        {{ menusList?.name }}
      </div>
    </template>

    <template #default>
      <MenuItem v-for="item in menusList.children" :menusList="item" />
    </template>
  </el-sub-menu>

  <el-menu-item v-else :index="menusList.router">
    <template #title>
      <el-icon>
        <component :is="menusList.icon"></component>
      </el-icon>
      <div class="title">
        {{ menusList.name }}
      </div>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { computed } from "vue";

defineOptions({
  name: "MenuItem",
});
const props = defineProps(["menusList"]);

const isChildren = computed(() => {
  return !!props.menusList.children;
});


// watch(() => router);
</script>
