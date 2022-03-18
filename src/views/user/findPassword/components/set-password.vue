<template>
<div class="password-container">
  <div class="password-form">
    <a-form :model="passwordForm" layout="vertical" ref="passwordFormRef">
      <a-form-item field="userPasssword" label="密码" :rules="checkPassword" :validate-trigger="['change', 'blur']">
        <a-input-password placeholder="请输入密码" allow-clear v-model="passwordForm.userPasssword"/>
      </a-form-item>
      <a-form-item field="confirmUserPasssword" label="确认密码" :rules="confirmPasssword" :validate-trigger="['change', 'blur']">
        <a-input-password placeholder="请输入密码" allow-clear v-model="passwordForm.confirmUserPasssword"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" long :class="{active: isActive}" :disabled="!isActive" @click="comfirm">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script>
import { changePasswordApi } from "@/services/api/login"
export default {
  data() {
    return {
      passwordForm: {
        userPasssword: '',
        confirmUserPasssword: ''
      },
      checkPassword: [{
        required: true,
        validator: (value, cb) => {
          return new Promise(resolve => {
            if (!value) {
              cb('请输入密码')
            } else {
              if (this.passwordForm.confirmUserPasssword) {
                if (value !== this.passwordForm.confirmUserPasssword) {
                  this.$refs.passwordFormRef.setFields({
                    confirmUserPasssword: {
                      status: 'error',
                      message: '两次密码输入不一致!'
                    }
                  })
                  this.isCheckFailed = true
                } else {
                  this.$refs.passwordFormRef.setFields({
                    confirmUserPasssword: {
                      status: 'validating',
                      message: ''
                    }
                  })
                  this.isCheckFailed = false
                }
              }
            }
            resolve()
          })
        }
      }],
      confirmPasssword: [{
        required: true,
        validator: (value, cb) => {
          return new Promise(resolve => {
            if (!value) {
              cb('请输入密码')
            } else if (value !== this.passwordForm.userPasssword) {
              cb('两次密码输入不一致!')
              this.isCheckFailed = true
            } else {
              this.isCheckFailed = false
            }
            resolve()
          })
        }
      }],
      isCheckFailed: true
    }
  },
  computed: {
    isActive() {
      return (!this.passwordForm.userPasssword || !this.passwordForm.confirmUserPasssword || this.isCheckFailed) ? false : true
    }
  },
  methods: {
    comfirm() {
      changePasswordApi(this.passwordForm.confirmUserPasssword).then(res => {
        if (res.data) {
          this.$emit('setSuccess')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.password-container {
  height: 100%;
  display: flex;
  justify-content: center;
 
  :deep(.password-form) {
    min-width: 280px;
    margin-top: 100px;

    .arco-form {
      .arco-form-item {

        &:nth-child(3) {
          margin-top: 12px;
          margin-bottom: 12px;
          .arco-form-item-label-col {
            margin: 0px;
          }
          .arco-form-item-wrapper-col {
            .arco-btn {
              height: 36px;
              line-height: 36px;
              background: #94BFFF;
            }
            .active {
              background: #165DFF;
            }
          }
        }

        .arco-form-item-label-col {
          margin-bottom: 4px;
        
          .arco-form-item-label {
            line-height: 22px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #86909C;
          }
        }
        .arco-form-item-wrapper-col {
          .arco-form-item-content-wrapper {
            .arco-form-item-content {
                 .arco-input-wrapper {
                   height: 36px;
                    .arco-input {
                      font-size: 16px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      color: #1D2129;
                    }

                    input::placeholder {
                      font-size: 16px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      color: #86909C;
                    }
                 }
            }
          }
        }
      }
    }
  }
}
</style>