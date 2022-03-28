<template>
  <div class="find-password-container">
    <div class="steps-box">
      <a-steps type="navigation" :current="current" @change="setCurrent">
        <a-step>填写账号</a-step>
        <a-step>身份验证</a-step>
        <a-step>设置新密码</a-step>
        <a-step>完成</a-step>
      </a-steps>
    </div>
    <div class="content">
      <Fill-Account @accountRight="accountRight" v-show="current === 1" />
      <Verify :username="username" @verifySuccess="verifySuccess" v-show="current === 2" />
      <Set-Password @setSuccess="setSuccess" v-show="current === 3" />
      <Complete v-show="current === 4" />
    </div>
  </div>
</template>

<script>
import FillAccount from "./components/account.vue";
import Verify from "./components/verify.vue";
import SetPassword from "./components/set-password.vue";
import Complete from "./components/complete.vue";
export default {
  components: {
    FillAccount,
    Verify,
    SetPassword,
    Complete,
  },
  data() {
    return {
      current: 1,
      username: "",
    };
  },
  methods: {
    setCurrent(current) {
      // if (current < this.current) {
      //   this.current = current
      // }
      this.current = current;
    },
    accountRight(val) {
      this.username = val;
      this.current = 2;
    },
    verifySuccess() {
      this.current = 3;
    },
    setSuccess() {
      this.current = 4;
    },
  },
};
</script>

<style lang="less" scoped>
.find-password-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  :deep(.steps-box) {
    width: 550px;
    margin-top: 78px;
    .arco-steps {
      .arco-steps-item {
        margin: 0px;
        padding: 0px;
        &:not(:last-child) {
          margin-right: 17px;
        }
        .arco-steps-item-node {
          .arco-steps-icon {
            font-size: 14px;
            font-family: NunitoSans-Regular, NunitoSans;
            width: 24px;
            height: 24px;
            border-radius: 12px;
            line-height: 22px;
          }
        }
        .arco-steps-item-content {
          // padding-bottom: 17px;
          &::after {
            top: 8px;
            right: 0px;
          }
          .arco-steps-item-title {
            line-height: 22px;
            font-size: 14px;
            font-family: NunitoSans-Regular, NunitoSans;
            color: #4e5969;
            // margin: 17px 0px;
          }
        }
      }
      .arco-steps-item-active {
        .arco-steps-item-node {
        }
        .arco-steps-item-content {
          // margin-bottom: 17px;
          margin-bottom: 0px;
          .arco-steps-item-title {
          }
        }
      }
    }
  }
}
</style>
