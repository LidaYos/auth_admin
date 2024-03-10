<template>
    <SlotItem>
        <template v-slot:footer="{ testProps }">
            <template v-for="item in testProps" :key="item.id">
                <li>
                    {{ item.title }}
                </li>
            </template>
        </template>
    </SlotItem>
</template>

<script lang="ts" setup>
import SlotItem from "./components/slot.vue"
</script>