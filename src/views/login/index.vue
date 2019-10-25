<template>
  <div class="container">
    <!-- 登录卡片 -->
    <el-card>
      <!-- 黑马头条  图片 -->
      <img src="../../assets/logo_index.png" width="200px" alt />
      <!-- 输入框 -->
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.code" placeholder="请输入验证码" style="width:235px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        phone: '',
        code: ''
      }
    }
  }
}
</script>

<style scoped lang="less">
// 全屏容器
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
}
.el-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
img {
  display: block;
  margin: 0 auto 30px;
}
</style>
