<template>
    <DynamicItem :needData="needData" />
</template>

<script lang="ts" setup>
import DynamicItem from "./components/dynamicFormItem.vue"
import { ref, watch, onMounted, computed } from "vue"

const needData = ref([])
const date = ref()
const value = ref(111)
// 模拟接口
const portData = () => {
    // 模拟数据
    const simulateData = [
        {
            key: '1', title: '上装信息',
            configurationOps: [
                { key: '1-1', name: '排量', type: 'input' },
                { key: '1-2', name: '日期', type: 'date' }
            ]
        },
        {
            key: '2', title: '车辆标识信息',
            configurationOps: [
                { name: '集团编号', type: 'inputNum' },
                {
                    name: '是否商品', type: 'radio',
                    propValueVOs: [
                        { type: "0", content: "否" },
                        { type: "1", content: "是" }
                    ],
                },
                {
                    name: '车辆性质', type: 'checkbox',
                    propValueVOs: [
                        { type: "0", content: "唱" },
                        { type: "1", content: "跳" },
                        { type: "2", content: "rap" },
                        { type: "3", content: "打篮球" }
                    ],
                }
            ]
        }
    ]

    return new Promise(resolve => {
        resolve(simulateData)
    })
}

// 获取数据
const GainData = async () => {
    const result = await portData()
    needData.value = result
}

onMounted(() => {
    GainData()
})

</script>

