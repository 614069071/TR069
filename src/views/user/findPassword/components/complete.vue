<template>
<div class="complete-container">
  <div class="complete-box">
    <a-result status="success" title="重置密码完成" >
      <template #subtitle>
        重置密码登录成功，请重新登录
      </template>
      <template #extra>
        <a-space>
          <a-button type='primary' @click="goLogin">登录</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</div>
</template>

<script>
import { IconCheckCircleFill } from '@arco-design/web-vue/es/icon';
export default {
  components: { IconCheckCircleFill },
  methods: {
    goLogin() {
      this.$router.push('/user/login')
    }
  }
}
</script>

<style lang="less" scoped>
.complete-container {
  height: 100%;
  display: flex;
  justify-content: center;
 
  :deep(.complete-box) {
    min-width: 280px;
    margin-top: 126px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .arco-result-title {
      font-size: 14px;
      font-family: NunitoSans-SemiBold, NunitoSans;
      font-weight: 600;
      color: #1D2129;
      line-height: 22px;
      margin: 17px 0px 0px 0px;
    }
    .arco-result-subtitle {
      font-size: 14px;
      font-family: NunitoSans-Regular, NunitoSans;
      font-weight: 400;
      color: #4E5969;
      line-height: 22px;
      margin: 0px 0px 20px 0px;
    }
    .arco-btn {
      width: 71px;
      height: 36px;
      line-height: 36px;
      background: #165DFF;
      border-radius: 4px;
    }
  }
}
</style>