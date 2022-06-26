<template>
  <div class="container">
    <div class="login">
      <div class="header">iHRM后台登录系统</div>
      <el-form :model="formData" ref="formRef" :rules="rules">
        <el-form-item prop="mobile">
          <el-input size="large" v-model="formData.mobile">
            <template #prefix>
              <el-icon :size="iconFont">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="large"
            type="password"
            v-model="formData.password"
            show-password
          >
            <template #prefix>
              <el-icon :size="iconFont">
                <Lock />
              </el-icon>
            </template>
            <template #suffix> </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" @click="handleSubmit(1, 2)">登录</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24">
          <p class="tips">还没有账号？立即注册</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/store/userStore'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { validMobile, validPassword } from '@/utils/validator'
import { to } from 'await-to-js'
import { throttle } from '@/utils/throttle'
// 表单相关的类型
import type { FormInstance, FormRules } from 'element-plus'
import type { UserLogin } from '@/types/request'
const formRef = ref<FormInstance>()
const user = userStore()
const router = useRouter()
// 收集表单数据
const formData = reactive<UserLogin>({
  mobile: '13800000002',
  password: '123456'
})
// 手机号自定义校验
const mobileValidate = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('手机号为必填项'))
    return
  }

  if (!validMobile(value)) {
    callback(new Error('手机号格式不正确'))
    return
  }
  callback()
}
// 密码自定义校验
const passwordValidate = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码为必填项!'))
  }
  if (!validPassword(value)) {
    callback(new Error('密码格式不正确'))
    return
  }
  callback()
}
// 校验规则
const rules = reactive<FormRules>({
  mobile: [{ validator: mobileValidate, trigger: 'blur' }],
  password: [{ validator: passwordValidate, trigger: 'blur' }]
})
// 字体图标的大小
const iconFont = 18

// 登录处理函数，做了节流优化
const handleSubmit = throttle(() => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) return
    const [error, result] = await to(user.userLogin(formData))
    // 如果error存在则代表请求报错，提示用户错误信息
    if (error) {
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 2000
      })
      return
    }
    // 登录成功提示用户，并在2秒后跳转到首页
    ElMessage({
      message: result?.message,
      type: 'success',
      duration: 2000,
      onClose: () => {
        router.push({ path: '/' })
      }
    })
  })
}, 2000)
</script>

<style lang="scss" scoped>
.container {
  background: url('../../assets/common/login.jpg') no-repeat 50% 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.login {
  width: 500px;
  margin-top: -100px;

  .header {
    text-align: center;
    letter-spacing: 2px;
    font-size: 50px;
    color: #fff;
    font-weight: 200;
    margin-bottom: 20px;
    user-select: none;
  }

  // 调整表单的背景色
  :deep(.el-input__wrapper) {
    background-color: #d3e5ff;
  }

  // 调整表单的高度、圆角
  .el-input {
    height: 55px;
    border-radius: 5px;

    :deep(input) {
      color: #68b0fe;
      font-size: 18px;
    }
  }

  :deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: none;
  }

  :deep(.el-form-item__error) {
    color: #fff;
  }

  .el-button {
    width: 100%;
    height: 60px;
    color: #fff;
    background-color: #407ffe;
    border-color: #407ffe;
    font-size: 28px;
  }

  .tips {
    text-align: center;
    color: #ffffff;
  }
}
</style>
