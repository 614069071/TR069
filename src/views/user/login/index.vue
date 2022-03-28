<template>
  <div class="login-container">
    <div class="login-form">
      <p>{{ $t("login.title") }}</p>
      <a-form :model="loginForm" layout="vertical">
        <a-form-item field="username" :label="$t('login.usename')" :rules="[{ required: true, message: `${$t('login.usename.placeholder')}` }]" :validate-trigger="['change', 'blur']" hide-asterisk>
          <a-input :placeholder="$t('login.usename.placeholder')" allow-clear v-model="loginForm.username" />
        </a-form-item>
        <a-form-item
          field="userPasssword"
          :label="$t('login.password')"
          :rules="[{ required: true, message: `${$t('login.password.placeholder')}` }]"
          :validate-trigger="['change', 'blur']"
          hide-asterisk
        >
          <a-input-password :placeholder="$t('login.password.placeholder')" allow-clear v-model="loginForm.userPasssword" />
        </a-form-item>
        <a-form-item
          field="verifyCode"
          :label="$t('login.verificationCode')"
          :rules="[{ required: true, message: `${$t('login.verificationCode.placeholder')}` }]"
          :validate-trigger="['change', 'blur']"
          hide-asterisk
        >
          <a-input :placeholder="$t('login.verificationCode.placeholder')" allow-clear v-model="loginForm.verifyCode" @keydown.enter="login" />
          <div class="verify-code-box" @click="dealCode">
            <img :src="codeImgUrl" alt="" />
          </div>
        </a-form-item>
        <a-form-item field="isRead">
          <a-checkbox value="1" @change="remember" :model-value="isRemenber">{{ $t("login.rememberAccount") }}</a-checkbox>
          <router-link to="/user/find-password">{{ $t("login.forgetPassword") }}</router-link>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long :class="{ active: isActive }" :disabled="!isActive" @click="login">{{ $t("login.title") }}</a-button>
        </a-form-item>
        <a-form-item>
          <span>{{ $t("login.noAccount") }}</span>
          <router-link to="/user/register">{{ $t("login.goRegist") }}</router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { getVerifyCodeApi, loginApi } from "@/services/api/login";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        userPasssword: "",
        verifyCode: "",
      },
      codeImgUrl: "",
      uuid: "",
      isRemenber: false,
    };
  },
  computed: {
    isActive() {
      return !this.loginForm.username || !this.loginForm.userPasssword || !this.loginForm.verifyCode ? false : true;
    },
  },
  created() {
    this.loginForm.username = localStorage.getItem("userId");
    this.loginForm.userPasssword = localStorage.getItem("password");
    this.isRemenber = localStorage.getItem("userId") ? true : false;
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
    login() {
      if (this.isRemenber) {
        localStorage.setItem("userId", this.loginForm.username);
        localStorage.setItem("password", this.loginForm.userPasssword);
      } else {
        localStorage.removeItem("userId");
        localStorage.removeItem("password");
      }
      sessionStorage.removeItem("routes"); // 登录去掉之前缓存中的菜单数据
      const params = {
        username: this.loginForm.username,
        password: this.loginForm.userPasssword,
        code: this.loginForm.verifyCode,
        uuid: this.uuid,
      };
      loginApi(params)
        .then(res => {
          //  this.$router.push('/system-admin/system')

          if (res) {
            let resData = res.data;
            if (resData.obj.firstLogin === 1) {
              // TODO: 判断是否第一次登录，第一次登录则直接跳转到修改密码，修改密码页面未设计好，待做
            } else {
              let path = this.$route.query.redirect; // 获取现在的路由，如果没有就跳转到首页
              this.$router.push(path == "/" || path == undefined ? "/layout/home" : path);
            }
          } else {
            this.dealCode();
          }
        })
        .catch(err => {
          throw err;
        });
    },
    remember(val) {
      this.isRemenber = val;
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;

  :deep(.login-form) {
    min-width: 280px;
    margin-top: 126px;

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
        &:nth-child(3) {
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
        &:nth-child(4) {
          .arco-form-item-label-col {
            margin: 0px;
          }
          .arco-form-item-wrapper-col {
            min-height: 22px;
            .arco-form-item-content-wrapper {
              .arco-form-item-content {
                min-height: 22px;
                line-height: 22px;
                justify-content: space-between;
                .arco-checkbox {
                  .arco-checkbox-label {
                    font-family: NunitoSans-Regular, NunitoSans;
                    color: #1d2129;
                    margin-right: 10px;
                  }
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

        &:nth-child(5) {
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

        &:nth-child(6) {
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
                  margin-right: 5px;
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
