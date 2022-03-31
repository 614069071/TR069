<template>
  <div class="authentication-container">
    <div class="authentication-form">
      <a-form :model="authenticationForm" layout="vertical">
        <a-form-item field="authenticationAcount" label="绑定邮箱" :rules="checkEmailFormat" :validate-trigger="['change', 'blur']">
          <a-input placeholder="请输入该账号绑定的邮箱" allow-clear v-model="authenticationForm.authenticationAcount" />
        </a-form-item>
        <a-form-item field="verifyCode" label="验证码" :rules="[{ required: true, message: '请输入验证码' }]" :validate-trigger="['change', 'blur']">
          <a-input placeholder="请输入" allow-clear v-model="authenticationForm.verifyCode" />
          <a-button type="primary" size="large" :disabled="disableResend" :class="{ inactive: isInactive }" @click="sendCode">{{ countDown }}{{ sendCodeDesc }}</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long :class="{ active: isActive }" :disabled="!isActive" @click="confirm">确定</a-button>
        </a-form-item>
        <a-form-item>
          <router-link to="/user/login">返回登录</router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { checkEmailApi, checkEmailCodeApi } from "@/services/api/login";
export default {
  props: {
    username: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      authenticationForm: {
        authenticationAcount: "",
        verifyCode: "",
      },
      ischeckFailed: true,
      checkEmailFormat: [
        {
          required: true,
          validator: (value, cb) => {
            return new Promise(resolve => {
              if (!value) {
                this.ischeckFailed = true;
                cb("请输入邮箱");
              } else if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) {
                this.ischeckFailed = true;
                cb("邮箱格式不正确");
              } else {
                this.ischeckFailed = false;
              }
              resolve();
            });
          },
        },
      ],
      countDown: "",
      sendCodeDesc: "发送验证码",
      isInactive: false,
      remainingTime: 0,
      timer: null,
      disableResend: false,
    };
  },
  watch: {
    remainingTime: function () {
      this.sendCodeDesc = `重发(${this.remainingTime}S)`;
      if (this.remainingTime === 0) {
        this.disableResend = false;
        this.sendCodeDesc = "发送验证码";
        clearInterval(this.timer);
      }
    },
  },
  computed: {
    isActive() {
      return !this.authenticationForm.authenticationAcount || !this.authenticationForm.verifyCode || this.ischeckFailed ? false : true;
    },
  },
  methods: {
    sendCode() {
      checkEmailApi(this.username, this.authenticationForm.authenticationAcount)
        .then(res => {
          if (res.data) {
            this.disableResend = true;
            this.resendEmail();
          }
        })
        .catch(err => {
          this.disableResend = false;
        });
    },
    confirm() {
      checkEmailCodeApi(this.username, this.authenticationForm.verifyCode).then(res => {
        if (res.data) {
          this.$emit("verifySuccess");
        }
      });
    },
    resendEmail() {
      this.remainingTime = 60;
      this.timer = setInterval(() => {
        this.remainingTime--;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.authentication-container {
  height: 100%;
  display: flex;
  justify-content: center;

  :deep(.authentication-form) {
    min-width: 280px;
    margin-top: 100px;

    .arco-form {
      .arco-form-item {
        &:nth-last-of-type(1) {
          .arco-form-item-label-col {
            display: none;
          }
          .arco-form-item-content {
            justify-content: center !important;
            min-height: 22px;
            a {
              text-decoration: none;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #165dff;
              line-height: 22px;
            }
          }
        }
        &:nth-child(2) {
          .arco-form-item-wrapper-col {
            .arco-form-item-content-wrapper {
              .arco-form-item-content {
                .arco-input-wrapper {
                  width: 258px;
                  margin-right: 12px;
                }
                .arco-btn {
                  width: 90px;
                  background: #165dff;
                  font-size: 12px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  border-radius: 4px;
                }
                .inactive {
                  background: #94bfff;
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
