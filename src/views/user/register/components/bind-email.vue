<template>
<div class="email-container">
  <div class="email-form">
    <p>注册</p>
    <a-form :model="emailForm" layout="vertical">
      <a-form-item field="emailAcount" label="绑定邮箱" :rules="[{ required: true, message: '请输入邮箱' }]" :validate-trigger="['change', 'blur']">
        <a-input placeholder="请输入邮箱" allow-clear v-model="emailForm.emailAcount">
          <template #suffix>
            <a-popover title="为什么要绑定邮箱？" content-class="emailTips">
              <icon-question-circle />
              <template #content>
                <p>绑定邮箱可增加您账号的安全性，在您忘记密码时，邮箱可以帮您找回密码。</p>
              </template>
            </a-popover>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="verifyCode" label="验证码" :rules="[{ required: true, message: '请输入验证码' }]" :validate-trigger="['change', 'blur']">
        <a-input placeholder="请输入验证码" allow-clear v-model="emailForm.verifyCode" />
        <a-button type="primary" size="large" :disabled="disableResend" :class="{inactive: isInactive}" @click="sendCode">{{countDown}}{{sendCodeDesc}}</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" long :class="{active: isActive}" :disabled="!isActive" @click="confirmRegist">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script>
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon';
import { useAppStore } from "@/store"
import { getEmailCodeApi, registApi } from '@/services/api/login'
import { Message } from '@arco-design/web-vue';

export default {
  components: { IconQuestionCircle },
  data() {
    return {
      emailForm: {
        emailAcount: '',
        verifyCode: ''
      },
      countDown: '',
      sendCodeDesc: '发送验证码',
      isInactive: false,
      remainingTime: 0,
      timer: null,
      disableResend: false
    }
  },
  watch: {
    remainingTime: function () {
      this.sendCodeDesc = `重发(${this.remainingTime}S)`
      if (this.remainingTime === 0) {
        this.disableResend = false
        this.sendCodeDesc = '发送验证码'
        clearInterval(this.timer)
      }
    }
  },
  computed: {
    isActive() {
      return (!this.emailForm.emailAcount || !this.emailForm.verifyCode) ? false : true
    }
  },
  created() {
    
  },
  methods: {
    sendCode() {
      const appStore = useAppStore()
      let username = appStore.username
      this.disableResend = true
      getEmailCodeApi(username, this.emailForm.emailAcount).then(res=> {
        if (res.data) {
          this.resendEmail()
        }
      })
    },
    confirmRegist() {
      const appStore = useAppStore()
      let username = appStore.username
      registApi(username, this.emailForm.verifyCode, this.emailForm.emailAcount).then(res => {
        if (res.data) {
          Message.success({
            id: 'registSuccess',
            content: '注册成功！立马去登录！',
            duration: 2000,
            position: 'top',
          })
        }
        this.$router.replace('/user/login')
      })
    },
    resendEmail() {
      this.remainingTime = 60
      this.timer = setInterval(() => {
        this.remainingTime--
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.email-container {
  height: 100%;
  display: flex;
  justify-content: center;
 
  :deep(.email-form) {
    width: 280px;
    min-width: 280px;
    margin-top: 206px;
   
    p {
      line-height: 24px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #1D2129;
      margin: 0px;
    }

    .arco-form {
      .arco-form-item {
        &:nth-child(1) {
          margin-top: 32px;
        }
        &:nth-child(2) {
          .arco-form-item-wrapper-col{
            .arco-form-item-content-wrapper {
              .arco-form-item-content {
                .arco-input-wrapper {
                  width: 178px;
                  margin-right: 12px;
                }
                .arco-btn {
                  background: #165DFF;
                  font-size: 12px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  border-radius: 4px;
                }
                .inactive {
                  background: #94BFFF;
                }
              }
            }
          }
        }
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
              border-radius: 4px;
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