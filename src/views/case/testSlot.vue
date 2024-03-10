<template>
    <div>
        <h1>加纳~</h1>
        <SlotItem>
            1、haihaihai
        </SlotItem>
        <SlotItem slot="custom">
            2、不错
        </SlotItem>

    </div>
</template>

<script lang="ts" setup>
import SlotItem from "./components/slot.vue"
</script>