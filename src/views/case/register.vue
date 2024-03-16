<template>
    <button class="init" @click="handle">{{ count }}</button>
    <iframe>
    </iframe>
</template>

<script lang="ts" setup>
import { reactive, computed, watch } from "vue"
import { register } from "@/utils/register"

const init = reactive({ width: 100 })

const count = computed(() => {
    const res = register(init.width)
    return res
})

const handle = () => {
    init.width++
}

watch(() => init.width, (newWidth) => {
    console.log(newWidth)  // 当init.width变化时，在控制台输出新值
})
</script>

<style lang="scss" scoped>
.init {
    position: fixed;
    z-index: 1;
}
</style>