<template>
  <div class="regist-container">
    <div class="regist-form">
      <p>注册</p>
      <a-form :model="registForm" layout="vertical" ref="registFormRef">
        <a-form-item field="username" label="用户名" :rules="[{ required: true, message: '请输入用户名' }]" :validate-trigger="['change', 'blur']">
          <a-input placeholder="请输入用户名" allow-clear v-model="registForm.username" @change="isUserExist" />
        </a-form-item>
        <a-form-item field="userPasssword" label="密码" :rules="checkPassword" :validate-trigger="['change', 'blur']">
          <a-input-password placeholder="请输入密码" allow-clear v-model="registForm.userPasssword" />
        </a-form-item>
        <a-form-item field="confirmUserPasssword" label="确认密码" :rules="confirmPasssword" :validate-trigger="['change', 'blur']">
          <a-input-password placeholder="请输入密码" allow-clear v-model="registForm.confirmUserPasssword" />
        </a-form-item>
        <a-form-item field="invitationCode" label="邀请码" :rules="[{ required: true, message: '请输入邀请码' }]" :validate-trigger="['change', 'blur']">
          <a-input placeholder="请输入邀请码" allow-clear v-model="registForm.invitationCode" />
        </a-form-item>
        <a-form-item field="verifyCode" label="验证码" :rules="[{ required: true, message: '请输入验证码' }]" :validate-trigger="['change', 'blur']">
          <a-input placeholder="请输入验证码" allow-clear v-model="registForm.verifyCode" />
          <div class="verify-code-box" @click="dealCode">
            <img :src="codeImgUrl" alt="" />
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long :class="{ active: isActive }" :disabled="!isActive" @click="nextStep">下一步</a-button>
        </a-form-item>
        <a-form-item>
          <span>已有账号？</span>
          <router-link to="/user/login">去登录</router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { getVerifyCodeApi, validateNameApi, invitationExistApi } from "@/services/api/login";
import { useAppStore } from "@/store";
export default {
  data() {
    return {
      registForm: {
        username: "",
        userPasssword: "",
        confirmUserPasssword: "",
        invitationCode: "",
        verifyCode: "",
      },
      codeImgUrl: "",
      uuid: "",
      checkPassword: [
        {
          required: true,
          validator: (value, cb) => {
            return new Promise(resolve => {
              if (!value) {
                cb("请输入密码");
              } else {
                if (this.registForm.confirmUserPasssword) {
                  if (value !== this.registForm.confirmUserPasssword) {
                    this.$refs.registFormRef.setFields({
                      confirmUserPasssword: {
                        status: "error",
                        message: "两次密码输入不一致!",
                      },
                    });
                    this.isCheckFailed = true;
                  } else {
                    this.$refs.registFormRef.setFields({
                      confirmUserPasssword: {
                        status: "validating",
                        message: "",
                      },
                    });
                    this.isCheckFailed = false;
                  }
                }
              }
              resolve();
            });
          },
        },
      ],
      confirmPasssword: [
        {
          required: true,
          validator: (value, cb) => {
            return new Promise(resolve => {
              if (!value) {
                cb("请输入密码");
              } else if (value !== this.registForm.userPasssword) {
                cb("两次密码输入不一致!");
                this.isCheckFailed = true;
              } else {
                this.isCheckFailed = false;
              }
              resolve();
            });
          },
        },
      ],
      isCheckFailed: true,
    };
  },
  computed: {
    isActive() {
      return !this.registForm.username ||
        !this.registForm.userPasssword ||
        !this.registForm.confirmUserPasssword ||
        !this.registForm.invitationCode ||
        !this.registForm.verifyCode ||
        this.isCheckFailed
        ? false
        : true;
    },
  },
  created() {
    this.dealCode();
  },
  methods: {
    dealCode() {
      getVerifyCodeApi().then(res => {
        const codeData = res?.data;
        this.codeImgUrl = codeData.img;
        this.uuid = codeData.uuid;
      });
    },
    isUserExist(value) {
      validateNameApi(value).then(res => {
        const resData = res?.data;
        if (resData.obj) {
          this.$refs.registFormRef.setFields({
            username: {
              status: "error",
              message: "用户名已存在",
            },
          });
          this.isCheckFailed = true;
        } else {
          this.isCheckFailed = false;
        }
      });
    },
    nextStep() {
      let params = {
        username: this.registForm.username,
        password: this.registForm.userPasssword,
        checkPassword: this.registForm.confirmUserPasssword,
        invitationCode: this.registForm.invitationCode,
        code: this.registForm.verifyCode,
        uuid: this.uuid,
        email: "",
        verifyCode: "",
      };
      const appStore = useAppStore();
      appStore.updateSettings({ username: this.registForm.username });
      invitationExistApi(params).then(res => {
        const resData = res?.data;
        if (resData) {
          this.$emit("toBindEmail");
        } else {
          this.dealCode();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.regist-container {
  height: 100%;
  display: flex;
  justify-content: center;

  :deep(.regist-form) {
    min-width: 280px;
    margin-top: 66px;

    p {
      line-height: 24px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #1d2129;
      margin: 0px;
    }

    .arco-form {
      .arco-form-item {
        &:nth-child(1) {
          margin-top: 32px;
        }
        &:nth-child(5) {
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

        &:nth-child(6) {
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

        &:nth-child(7) {
          margin-bottom: 0px;
          .arco-form-item-label-col {
            margin: 0px;
          }
          .arco-form-item-wrapper-col {
            min-height: 22px;
            .arco-form-item-content-wrapper {
              .arco-form-item-content {
                min-height: 22px;
                line-height: 22px;
                justify-content: center;

                span {
                  color: #4e5969;
                  font-family: PingFangSC-Regular, PingFang SC;
                }

                a {
                  text-decoration: none;
                  color: #165dff;
                  font-family: PingFangSC-Regular, PingFang SC;
                }
              }
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
