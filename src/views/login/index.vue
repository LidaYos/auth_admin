<template>
    <div class="page">
        <el-form class="page__card" ref="formRef" label-width="70" :model="model" :rules="rules">

            <el-form-item label="用户名" prop="username">
                <el-input v-model="model.username" placeholder="请输入用户名..." />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="model.password" placeholder="请输入密码..." />
            </el-form-item>

            <el-form-item label="验证码" prop="verifyCode">
                <div class="captcha">
                    <el-input v-model="model.verifyCode" @keyup.enter="handleLogin" placeholder="验证码" />
                    <Captcha ref="CapRef" @click="requestCaptcha" />
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="loading" @click="handleLogin">登录</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import Captcha from "@/views/login/components/captcha.vue"
import { ref } from "vue"
import { useList } from '@/stores/user'
import { useRouter } from 'vue-router';
import { getLogin } from "@/api/login"

const store = useList()
const router = useRouter()

const CapRef = ref()
// 点击刷新验证码
const requestCaptcha = () => {
    CapRef.value.requestCaptcha
}

// 收集填写表单的数据
const model = ref({
    username: "admin",
    password: "123456",
    verifyCode: ""
})
// 表单限制
const rules = {
    username: [
        { required: true, message: "请输入用户名" }
    ],
    password: [
        { required: true, message: "请输入密码" }
    ],
    verifyCode: [
        { required: true, message: "请输入验证码" }
    ]
}

const formRef = ref()
const loading = ref(false) // 登录按钮，点击加载中
// 登录
const handleLogin = () => {
    formRef.value.validate((flag: boolean) => {
        if (!flag) return
        // 登录接口需要的数据
        const data = { ...model.value, captchaId: CapRef.value.captchaId }
        try {
            loading.value = true
            // 发起登录
            getLogin(data)
                .then(res => {
                    store.loginApi(res)
                    ElMessage({
                        type: 'success',
                        message: "登录成功"
                    })
                    // 登录成功，跳到url对应页面
                    const redirect = router.currentRoute.value.query.redirect || "/"
                    router.replace(redirect as string)
                })
        } catch (error) {
            // 刷新验证码，清空表单的填写
            formRef.value.resetFields()
            CapRef.value.requestCaptcha()
        } finally {
            loading.value = false
        }
    })
}

</script>

<style lang="scss" scoped>
.page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background-image: url("@/assets/img/bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(2px); // 添加模糊效果
        z-index: -1; // 放置在页面底部
    }

    &__card {
        border-radius: 15px;
        padding: 50px;
        width: 360px;
        background: url('@/assets/img/image.png');
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 111;
    }
}

.captcha {
    display: flex;
    height: 32px;
}

:deep(.el-form-item__label) {
    color: #ebe2d9;
}
</style>