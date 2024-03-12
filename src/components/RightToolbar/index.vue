<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="search">
        <el-button circle icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button circle icon="Refresh" @click="refresh()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns">
        <el-button circle icon="Menu" @click="showColumn()" />
      </el-tooltip>
    </el-row>

    <el-drawer v-model="open" title="显隐列" direction="rtl" :size="450">
      <el-table :data="newColumns" border class="table-container">
        <el-table-column prop="label" label="列名" align="center" />
        <el-table-column prop="visible" label="显示" align="center">
          <template #default="{ row }">
            <el-switch v-model="row.visible" @change="swicthChange($event, row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
const props = defineProps({
  showSearch: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Array,
  },
  search: {
    type: Boolean,
    default: true,
  },
  gutter: {
    type: Number,
    default: 10,
  },
})

const emits = defineEmits(['update:showSearch', 'queryTable'])

// 是否显示弹出层
const open = ref(false)

const style = computed(() => {
  const ret = {}
  if (props.gutter) {
    ret.marginRight = `${props.gutter / 2}px`
  }
  return ret
})

const newColumns = computed(() => {
  return props.columns.filter(item => {
    if (item.visible == undefined) {
      item.visible = true
    }
    return !['selection', 'operate'].includes(item.type)
  })
})

// 搜索
const toggleSearch = () => {
  emits('update:showSearch', !props.showSearch)
}

// 刷新
const refresh = () => {
  emits('queryTable')
}

// 打开显隐列dialog
const showColumn = () => {
  open.value = true
}

const swicthChange = (val, row) => {
  row.visible = val
}
</script>

<style lang="scss" scoped>
.table-container {
  width: 100%;
  height: 100%;
}
:deep(.el-row .mb15){
  position: absolute;
  right: 0;
}
</style>
