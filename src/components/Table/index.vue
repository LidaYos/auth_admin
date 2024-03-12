<template>
  <el-table
    ref="tableRef"
    v-loading="loading"
    :height="height"
    :max-height="maxHeight"
    :data="tableData"
    :row-key="rowKey"
    :default-expand-all="defaultExpandAll"
    :treeProps="treeProps"
    :border="border"
    :highlight-current-row="highlightCurrentRow"
    :span-method="spanMethod"
    :header-row-class-name="headerRowClassName"
    :header-cell-class-name="headerCellClassName"
    :row-class-name="tableRowClassName"
    :show-overflow-tooltip="showOverflowTooltip"
    :select-on-indeterminate="true"
    @selection-change="selectionChange"
    @select="select"
    @select-all="selectAll"
    @row-click="rowClick"
    @expand-change="expandChange"
  >
    <template v-for="column in columns">
      <el-table-column
        v-if="column.visible != undefined ? column.visible : true"
        :key="column.prop"
        :prop="column.prop"
        :type="column.type"
        :align="column.align"
        :show-overflow-tooltip="['tag', 'operate'].includes(column.type) ? false : column.overflowTooltip"
        :width="column.width"
        :min-width="column.minWidth"
        :class-name="column.className"
        :label="column.label"
        :index="column.indexMethod ? column.indexMethod : indexMethod"
        :fixed="column.fixed ? column.fixed : false"
        :selectable="column.type === 'selection' ? column.selectable : () => {}"
      >
        <!-- Tag -->
        <template v-if="column.type === 'tag'" #default="scope">
          <DictTag :options="column.tags" :value="scope.row[column.prop]" />
        </template>
        <!-- Switch -->
        <template v-else-if="column.type === 'switch'" #default="scope">
          <el-switch
            v-model="scope.row[column.prop]"
            :inline-prompt="column.inlinePrompt || true"
            :active-text="column.activeText || '启用'"
            :inactive-text="column.inactiveText || '停用'"
            :active-value="column.activeValue != undefined ? column.activeValue : '1'"
            :inactive-value="column.inactiveValue != undefined ? column.inactiveValue : '0'"
            @change="
              () => {
                column.change && column.change(scope.row, scope.$index)
              }
            "
          />
        </template>
        <!-- 操作 -->
        <template v-else-if="column.type === 'operate'" #default="scope">
          <!-- 按钮 -->
          <template v-for="(action, actionIndex) in getOperateActions(column, scope, 'pre')">
            <el-tooltip
              v-if="action.visible ? action.visible(scope.row, scope.$index) : true"
              :key="actionIndex"
              :content="action.content"
              :placement="action.placement ? action.placement : 'top'"
              :disabled="!column.tooltip"
            >
              <el-button link type="primary" :icon="action.icon" @click="action.event(scope.row, scope.$index)">
                {{ column.tooltip ? '' : action.content }}
              </el-button>
            </el-tooltip>
          </template>
          <!-- 按钮抽屉 -->
          <el-tooltip
            v-if="moreBtnShow(column, scope)"
            :content="column.dropdownContent || '更多'"
            placement="top"
            :disabled="!column.tooltip"
          >
            <el-dropdown trigger="click" placement="bottom-end">
              <el-button
                class="more-container"
                :class="{ 'more-no-margin-left': column.dropdown === 0 }"
                link
                type="primary"
                :icon="column.dropdownIcon || 'MoreFilled'"
                >{{ column.dropdownContent || '更多' }}</el-button
              >
              <template #dropdown>
                <el-dropdown-menu>
                  <template v-for="(dropdown, dropdownIndex) in getOperateActions(column, scope)">
                    <el-dropdown-item
                      v-if="dropdown.visible ? dropdown.visible(scope.row, scope.$index) : true"
                      :key="dropdown.content + dropdownIndex"
                      @click="dropdown.event(scope.row, scope.$index)"
                    >
                      <el-button link type="primary" :icon="dropdown.icon">
                        {{ column.tooltip ? '' : dropdown.content }}
                      </el-button>
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-tooltip>
        </template>
        <!-- 自定义插槽 -->
        <template v-else-if="column.type === 'slot'" #default="scope">
          <slot :name="column.prop" v-bind="scope" />
        </template>
        <!-- Index -->
        <template v-else-if="column.type === 'index' && column.isSlot" #default="scope">
          <slot :name="column.prop" v-bind="scope" />
        </template>
        <template v-else-if="column.type === 'expand'" #default="scope">
          <slot :name="column.prop" v-bind="scope" />
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup>
import { ref, computed, useAttrs } from 'vue'
import DictTag from '@/components/DictTag/index.vue'

const props = defineProps({
  // 表格高度
  height: {
    type: [String, Number],
  },
  // 表格最大高度
  maxHeight: {
    type: [String, Number],
  },
  // 表格列设置数据
  columns: {
    type: Array,
    default: () => [],
  },
  // 表格数据加载loading
  loading: {
    type: Boolean,
    default: false,
  },
  // 表格数据
  data: {
    type: Array,
    default: () => [],
  },
  // 行数据key
  rowKey: {
    type: [String, Function],
    default: '',
  },
  expandRowKeys: {
    type: Array,
    default: () => [],
  },
  // 是否默认展开所有行
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  // 渲染嵌套数据的配置选项
  treeProps: {
    type: Object,
    default: () => {
      return {
        children: 'children',
        hasChildren: 'hasChildren',
      }
    },
  },
  // 多选选中的id
  ids: {
    type: Array,
    default: () => [],
  },
  // 是否单选
  single: {
    type: Boolean,
  },
  // 是否多选
  multiple: {
    type: Boolean,
  },
  // 当前分页页数
  pageNo: {
    type: Number,
    default: 0,
  },
  // 分页展示数量
  pageSize: {
    type: Number,
    default: 0,
  },
  // 是否开启边框
  border: {
    type: Boolean,
    default: true,
  },
  // 是否开启模拟分页
  virtualPaging: {
    type: Boolean,
    default: false,
  },
  // 是否高光当前行
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
  spanMethod: {
    type: Function,
    default: () => {},
  },
  tableRowClassName: {
    type: Function,
    default: () => {},
  },
  headerRowClassName: {
    type: [String, Function],
    default: '',
  },
  headerCellClassName: {
    type: [String, Function],
    default: '',
  },
  showOverflowTooltip: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['update:ids', 'update:single', 'update:multiple', 'row-click', 'select', 'selectAll', 'expandChange'])

const attrs = useAttrs()
const tableRef = ref(null)

const tableData = computed(() => {
  if (props.virtualPaging) {
    return props.data.slice((props.pageNo - 1) * props.pageSize, props.pageNo * props.pageSize)
  } else {
    return props.data
  }
})

/**
 * @description: 操作栏按钮截取
 * @param {*} column 表格列属性
 * @param {*} position 截取的位置
 * @return {*}
 */
const getOperateActions = (column, scope = null, position = null) => {
  const columnFilter = column.actions.filter(item => {
    if (item.visible && scope) {
      return item.visible(scope.row, scope.$index)
    } else {
      return true
    }
  })
  if (position === 'pre') {
    return columnFilter.slice(0, column.dropdown != undefined ? column.dropdown : column.actions.length)
  } else if (column.dropdown) {
    return columnFilter.slice(column.dropdown)
  } else {
    return column.actions
  }
}

/**
 * @description: 操作栏是否显示更多按钮
 * @param {*} column 表格列属性
 * @param {*} scope 表格列数据
 * @return {*} true or false
 */
const moreBtnShow = (column, scope) => {
  const operateActions = getOperateActions(column)
  const isVisible = operateActions.some(item => {
    let isVisible = false
    if (item.visible != undefined) {
      isVisible = item.visible(scope.row, scope.$index)
    } else {
      isVisible = true
    }

    return isVisible
  })

  return column.actions && column.actions.length > column.dropdown && isVisible
}

/**
 * @description: 表格选择条数
 * @param {*} selection 已勾选的所有数据
 * @return {*}
 */
const selectionChange = selection => {
  if (attrs.onSelectionChangeEvent) {
    attrs.onSelectionChangeEvent(selection)
  } else {
    emits(
      'update:ids',
      selection.map(item => item.id)
    )
    emits('update:single', selection.length === 1)
    emits('update:multiple', selection.length ? true : false)
  }
}

/**
 * @description: 序号
 * @param {*} index
 * @return {*}
 */
const indexMethod = index => {
  if (props.pageNo > 0 && props.pageSize > 0) {
    return (props.pageNo - 1) * props.pageSize + index + 1
  } else {
    return index + 1
  }
}

const toggleRowSelection = (row, selected) => {
  tableRef.value.toggleRowSelection(row, selected)
}

const toggleAllSelection = () => {
  tableRef.value.toggleAllSelection()
}

/**
 * @description: 点击表格行事件
 * @param {*} row 点击的表格当前行数据
 * @param {*} column
 * @param {*} event
 * @return {*}
 */
const rowClick = (row, column, event) => {
  emits('row-click', row, column, event)
}

/**
 * @description: 当用户手动勾选数据行的 Checkbox 时触发的事件
 * @param {*} selection 已勾选的所有数据
 * @param {*} row 勾选的当前数据
 * @return {*}
 */
const select = (selection, row) => {
  emits('select', selection, row)
}

/**
 * @description: 手动勾选全选 Checkbox 时触发的事件
 * @param {*} selection 勾选的所有数据
 * @return {*}
 */
const selectAll = selection => {
  emits('selectAll', selection)
}

const expandChange = (row, expandedRows) => {
  emits('expandChange', row, expandedRows)
}

const toggleRowExpansion = (row, expanded) => {
  tableRef.value.toggleRowExpansion(row, expanded)
}

defineExpose({ toggleRowSelection, toggleAllSelection, toggleRowExpansion })
</script>

<style lang="scss" scoped>
.more-container {
  margin-left: 12px;
  margin-top: 2px;
  border: 1px solid transparent;
}

.more-no-margin-left {
  margin-left: 0;
}

:deep(.el-popper) {
  max-width: 66%;
}
</style>
