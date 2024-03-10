<template>
    <slot name="footer" :testProps="arr" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
const arr = ref([])
const tree = [
    {
        id: 1,
        title: "一"
    },
    {
        id: 2,
        title: "二"
    }
]
onMounted(() => {
    arr.value.push(...tree)
})
</script>