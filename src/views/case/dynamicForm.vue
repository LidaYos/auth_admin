<template>
    <div class="page">
        <el-form>
            <el-row v-for="item in NewData" :key="item.key">
                <el-col :span="24" class="group-container">{{ item.title }}</el-col>
                <el-col v-for="(propNameItem, propNameIndex) in item.configurationOps" :xs="24" :sm="24" :md="24"
                    :lg="10" :xl="9">
                    <el-form-item :label="propNameItem.name" class="form-item-container">

                        <!-- 单选框 -->
                        <div v-if="propNameItem.type === 'radio'">
                            <el-radio-group v-if="propNameItem.propValueVOs && propNameItem.propValueVOs.length"
                                v-model="propNameItem.isCheck">
                                <el-radio v-for="propValueItem in propNameItem.propValueVOs" :key="propValueItem.type"
                                    :label="propValueItem.type">{{ propValueItem.content }}</el-radio>
                            </el-radio-group>
                            <div v-else>
                                <el-text type="warning"><el-icon>
                                        <WarningFilled />
                                    </el-icon>&nbsp;暂无属性值</el-text>
                            </div>
                        </div>

                        <!-- 多选框 -->
                        <div v-else-if="propNameItem.type === 'checkbox'">
                            <el-checkbox-group v-if="propNameItem.propValueVOs && propNameItem.propValueVOs.length"
                                v-model="propNameItem.isCheck">
                                <el-checkbox v-for="propValueItem in propNameItem.propValueVOs"
                                    :key="propValueItem.type" :label="propValueItem.type">{{ propValueItem.content }}
                                </el-checkbox>
                            </el-checkbox-group>
                            <div v-else>
                                <el-text type="warning"><el-icon>
                                        <WarningFilled />
                                    </el-icon>&nbsp;暂无属性值</el-text>
                            </div>
                        </div>

                        <!-- 日期 -->
                        <div v-else-if="propNameItem.type === 'date'">
                            <el-date-picker v-model="propNameItem.valve"/>
                        </div>

                        <!-- 文本输入框 -->
                        <div v-else-if="propNameItem.type === 'input'">
                            <el-input v-model="propNameItem.value" />
                        </div>

                        <!-- 数字输入框  -->
                        <div v-else-if="propNameItem.type === 'inputNum'">
                            <el-input-number v-model="propNameItem.value" controls-position="right" :min="0" />
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

    </div>
    {{ needData }}
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, computed } from "vue"

const needData = ref([])

// 模拟接口
const portData = () => {
    // 模拟数据
    const simulateData = [
        {
            key: '1', title: '上装信息',
            configurationOps: [{ name: '排量', type: 'input' }, { name: '功率', type: 'input' }, {
                name: '日期', type: 'date'
            }]
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

const NewData = computed(() => needData.value)
</script>

<style lang="scss" scoped>
.page {
    z-index: 111;
}

.wf {
    z-index: 11;
}

.group-container {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    font-weight: bold;
    color: var(--el-color-primary);

    &::before {
        display: block;
        content: '';
        width: 3px;
        height: 16px;
        margin-right: 10px;
        background-color: var(--el-color-primary);
    }
}

.form-item-container {
    margin-bottom: 18px;
}
</style>