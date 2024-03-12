<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    :center="center"
    :fullscreen="fullscreen"
    :footerVisible="footerVisible"
    @close="closeDialog"
  >
    <slot />
    <template #footer v-if="footerVisible">
      <div>
        <el-button type="primary" :loading="submitLoading" @click="confirm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const emits = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '680px',
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  submitLoading: {
    type: Boolean,
    default: false,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  footerVisible: {
    type: Boolean,
    default: true,
  },
})

const visible = useVModel(props, 'modelValue', emits)

const cancel = () => {
  visible.value = false
  emits('update:modelValue', false)
  emits('cancel')
}

const confirm = () => {
  emits('confirm')
}

const closeDialog = () => {
  emits('close')
}
</script>

<style lang="scss" scoped></style>
