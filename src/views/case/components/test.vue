<template>
    <li>
        <span>{{ treeDataWithActive.name }}</span>
        <button v-if="hasChildren" @click="isOpen = !isOpen" class="parent">
            {{ isOpen ? "收起" : "展开" }}
        </button>
        <ul v-if="hasChildren && isOpen" class="son">
            <Tree v-for="item in treeDataWithActive.children" :list="item" @click="handleActive(item)" :class="{ active: item.isActive }" />
        </ul>
    </li>
</template>



<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps(["list"])
const treeDataRef = ref(props.list)

const isOpen = ref(true)

const hasChildren = computed(() => {
    return props.list.children && props.list.children.length > 0
})

const addIsActive = (node: any) => {    
    if (node.children) return
        // node.children.forEach((child: any) => {
        //     addIsActive(child);
        // });
    node.isActive = false; // 添加 isActive 属性，默认为 false
};
addIsActive(treeDataRef.value);


const treeDataWithActive = computed(() => {
    return { ...treeDataRef.value };
});


const handleActive = (item: any) => {
    item.isActive = !item.isActive;
}
</script>

<script lang="ts">
export default {
    name: "Tree"
}
</script>

<style lang="scss" scoped>
.parent {
    margin-left: 10px;
}

.son {
    cursor: pointer;
}
.active{
    color: red;
}
</style>