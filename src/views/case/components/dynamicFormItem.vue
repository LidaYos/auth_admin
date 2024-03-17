<template>
    <div class="page">
        <el-form>
            <el-row v-for="item in needData" :key="item.key">
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
                            <el-date-picker v-model="propNameItem.value" />
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
</template>

<script lang="ts" setup>
defineProps({
    needData: {
        type: Array,
        default: () => []
    }
})
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