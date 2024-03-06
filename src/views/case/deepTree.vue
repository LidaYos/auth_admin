<template>
    <Tree :list="treeData" />
</template>

<script lang="ts" setup>
import Tree from "./components/test.vue"

const treeData = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }, {name: "还花", children: [{name: "拉拉"}]}]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }]
        }
      ]
    }
  ]
}

</script>

<style lang="scss" scoped>

</style>