<template>
    <Dialog v-model="isShow" :title="title">
        <div>
            11
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "@/components/Dialog/index.vue"
import { ref } from "vue"

const isShow = ref(true)
const title = ref("测试")
</script>