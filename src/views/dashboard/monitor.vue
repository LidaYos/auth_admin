<template>
  <el-form label-width="140px">
    <el-row>

      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form-item label="车辆名称：">
            <el-input placeholder="请输入车辆名称"></el-input>
            <span class="tip">根据解析结果或所选品牌/型号生成，可修改</span>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form-item label="发布类型：">
            <el-radio v-for="item in 2">嗨嗨</el-radio>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form-item label="出售价格(元)：">
            <el-input placeholder="请输入价格"></el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form-item label="车辆图片：">
            <el-image class="img" v-for="item in 3" :src="'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'"></el-image>
            <span class="tip">左前45度照片将默认为车辆信息主图</span>
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
    import { ref } from "vue"

    const label = ref()

</script>

<style lang="scss" scoped>
.tip{
    color: red;
}
.img{
    width: 50px;
    height: 50px;
    margin-left: 10px;
}
</style>