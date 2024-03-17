<template>
    <div class="dd">
        <el-button class="btn" type="primary" @click="GainDate">选择商品分类（获取数据）</el-button>
        <el-select-v2 :max-collapse-tags="4" collapse-tags collapse-tags-tooltip v-model="selectValue"
            :disabled="!(categoryId !== undefined)" :options="categoryId !== undefined ? options : []" multiple
            clearable :placeholder="categoryId !== undefined ? '' : '请先选择商品分类'"
            :value-key="categoryId === undefined ? '' : 'value'" />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useData } from "@/stores/caseData"

const store = useData()

const form = ref(
    { propId: ["0"] }
)
const dd = []


// 创建数据
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const datas = Array.from({ length: 10 }).map((_, idx) => ({
    value: `${idx}`,
    label: `${initials[idx % 10]}${idx}`,
}))
const testList = () => {
    return new Promise((resolve, reject) => {
        resolve(datas)
    })
}
const GainDate = async () => {
    const list = await testList()
    store.updataPropGroupOption(list)
    store.updateGoodsCategory("true")
}


// 页面需要
const options = computed(() => store.propGroupOption)
const categoryId = computed(() => store.goodsCategory)

const selectValue = computed({
    get() {
        if (categoryId.value === undefined) {
            // 当 categoryId 为 undefined 时，返回空数组，表示禁用状态下不显示默认值
            return [];
        } else {
            // 当 categoryId 为 undefined 时，返回 form.propId，默认显示 value为'0'的数据名
            return form.value.propId;
        }
    },
    set(val) {
        // 如果 categoryId 不为 undefined，则允许修改 v-model
        if (categoryId.value !== undefined) {
            form.value.propId = val;
            console.log(val);
        }
    }
});

</script>

<style lang="scss" scoped>
.dd {
    height: 500px
}

.btn {
    position: relative;
    z-index: 11;
}
</style>