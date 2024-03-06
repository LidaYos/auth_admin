<template>
    <div>
        <el-button @click="refresh">点击发起请求</el-button>
    </div>
</template>

<script lang="ts" setup>
import { getCaptcha, type ICaptcha } from "@/api/login"
const refresh = async() => {
    await getCaptcha() as ICaptch
}
</script>