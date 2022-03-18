<template>
  <div class="account-container">
    <div class="account-form">
      <a-form :model="accountForm"
              layout="vertical"
              ref="accountFormRef">
        <a-form-item field="username"
                     label="用户名"
                     :rules="[{ required: true, message: '请输入用户名' }]"
                     :validate-trigger="['change', 'blur']">
          <a-input placeholder="请输入用户名"
                   allow-clear
                   v-model="accountForm.username"
                   @blur="verifyName" />
        </a-form-item>
        <a-form-item field="verifyCode"
                     label="验证码"
                     :rules="[{ required: true, message: '请输入验证码' }]"
                     :validate-trigger="['change', 'blur']">
          <a-input placeholder="请输入验证码"
                   allow-clear
                   v-model="accountForm.verifyCode" />
          <div class="verify-code-box"
               @click="dealCode">
            <img :src="codeImgUrl"
                 alt="">
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary"
                    long
                    :class="{active: isActive}"
                    :disabled="!isActive"
                    @click="confirmAccount">确定</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  getVerifyCodeApi,
  validateNameApi,
  checkCode
} from '@/services/api/login'
export default {
  data() {
    return {
      accountForm: {
        username: '',
        verifyCode: ''
      },
      codeImgUrl: '',
      uuid: '',
      isCheckFailed: true
    }
  },
  computed: {
    isActive() {
      return !this.accountForm.username ||
        !this.accountForm.verifyCode ||
        this.isCheckFailed
        ? false
        : true
    }
  },
  created() {
    this.dealCode()
  },
  methods: {
    dealCode() {
      getVerifyCodeApi().then((res) => {
        const codeData = res?.data
        this.codeImgUrl = codeData.img
        this.uuid = codeData.uuid
      })
    },
    confirmAccount() {
      checkCode(this.uuid, this.accountForm.verifyCode).then((res) => {
        const data = res?.data
        if (data) {
          this.$emit('accountRight', this.accountForm.username)
        } else {
          this.dealCode()
        }
      })
    },
    verifyName() {
      validateNameApi(this.accountForm.username).then((res) => {
        const resData = res?.data
        if (!resData.obj) {
          this.$refs.accountFormRef.setFields({
            username: {
              status: 'error',
              message: '用户名不存在'
            }
          })
          this.isCheckFailed = true
        } else {
          this.isCheckFailed = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.account-container {
  height: 100%;
  display: flex;
  justify-content: center;

  :deep(.account-form) {
    min-width: 280px;
    margin-top: 100px;

    .arco-form {
      .arco-form-item {
        &:nth-child(2) {
          .arco-form-item-wrapper-col {
            .arco-form-item-content-wrapper {
              .arco-form-item-content {
                .arco-input-wrapper {
                  width: 280px;
                  margin-right: 12px;
                }
                .verify-code-box {
                  width: 89px;
                  height: 36px;
                  cursor: pointer;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }
        }

        &:nth-child(3) {
          margin-top: 13px;
          margin-bottom: 12px;
          .arco-form-item-label-col {
            margin: 0px;
          }
          .arco-form-item-wrapper-col {
            .arco-btn {
              height: 36px;
              line-height: 36px;
              background: #94bfff;
              border-radius: 4px;
            }
            .active {
              background: #165dff;
            }
          }
        }
        .arco-form-item-label-col {
          margin-bottom: 4px;

          .arco-form-item-label {
            line-height: 22px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #86909c;
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
                  color: #1d2129;
                }

                input::placeholder {
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  color: #86909c;
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