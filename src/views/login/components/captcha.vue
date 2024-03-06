<template>
  <div class="captcha" v-html="svg" @click="requestCaptcha"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getCaptcha, type ICaptcha } from "@/api/login"


const svg = ref()
const captchaId = ref()
// 点击刷新验证码方法
const requestCaptcha = () => {
  request()
}
onMounted(() => {
  request()
})

// 获取数据
const request = async () => {
  const res = await getCaptcha() as ICaptcha
  svg.value = res.data
  captchaId.value = res.captchaId
}

// 对外暴漏，在ref身上
defineExpose({
  requestCaptcha,
  captchaId
})
</script>

<style lang="scss" scoped>
.captcha {
  margin-left: 12px;
  width: 100px;
  height: 38px;
  cursor: pointer;
  background-color: #334657;
  border-radius: 4px;

  :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>