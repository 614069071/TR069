<template>
  <OperationWrapper :title="title">
    <template v-slot:formContent>
      <div v-show="title != '详情'">
        <div>
          <a-form layout="vertical" :model="form" @submit-success="handleBeforeOk">
            <a-row :gutter="40">
              <a-col :span="8">
                <a-form-item label="用户名" field="username" maxLength="50" :rules="title == '添加用户' ? userRules : []" :validate-trigger="['change', 'blur']" required>
                  <a-input v-model="form.username" :disabled="title != '添加用户'" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="8" v-if="title == '添加用户'">
                <a-form-item label="密码" field="password" :rules="passwordRules" maxLength="50" minLength="8" :validate-trigger="['change', 'blur']" required>
                  <a-input v-model="form.password" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="会话超时时间(秒)/(S)" field="sessionTimeout" :rules="userTimeout" :validate-trigger="['change', 'blur']" required>
                  <a-input v-model="form.sessionTimeout" type="number" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="过期时间" field="expiredTime" required>
                  <a-date-picker v-model="form.expiredTime" :disabledDate="current => dayjs(current).isBefore(dayjs())" format="YYYY-MM-DD HH:mm:ss" :disabled="userId == form.username" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="角色" field="roleId" required>
                  <a-select v-model="form.roleId" :disabled="userId == form.username" placeholder="Please select ...">
                    <a-option v-for="role in roleList" :key="role.roleId" :label="role.roleNameZh" :value="role.roleId"></a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="电子邮箱" :rules="emailRules" field="email" type="email">
                  <a-input v-model="form.email" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="电话号码" :rules="phoneRules" field="phone">
                  <a-input v-model="form.phone" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="描述">
                  <a-textarea v-model="form.description" placeholder="Please enter something" maxLength="255" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <a-space>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button html-type="submit" type="primary">确定</a-button>
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <div>
        <div v-if="title == '详情'" class="outerBox">
          <div class="centerBox">
            <div class="labels">用户名</div>
            <div class="detail">{{ form.username }}</div>
          </div>
          <!-- <div class="centerBox">
            <div class="labels">密码</div>
            <div class="detail">{{form.password}}</div>
          </div> -->
          <div class="centerBox">
            <div class="labels">过期时间</div>
            <div class="detail">{{ form.registerTime }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">角色</div>
            <div class="detail">{{ form.role ? form.role.roleNameZh : "" }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">会话超时时间</div>
            <div class="detail">{{ form.sessionTimeout }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">电话号码</div>
            <div class="detail">{{ form.phone }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">电子邮箱</div>
            <div class="detail">{{ form.email }}</div>
          </div>

          <div class="centerBox">
            <div class="labels" style="height: 100px">描述</div>
            <div class="detail1" style="height: 100px">{{ form.description }}</div>
          </div>
        </div>
        <a-button html-type="submit" v-show="titles == '详情'" @click="handleCancel">取消</a-button>
      </div>
    </template>
  </OperationWrapper>
</template>

<script>
import OperationWrapper from "@/components/operation-wrapper/index.vue";
import { setUser } from "@/services/api/system-settings";
import { ref, watch, reactive, computed } from "vue";
import dayjs from "dayjs";
import { useAppStore } from "@/store";
import { jumpTo } from "@/utils/common";
export default {
  components: {
    OperationWrapper,
  },
  setup(props, context) {
    const appStore = useAppStore();
    const userId = ref(localStorage.getItem("userId"));
    const roleList = ref([]);
    const form = ref({});
    const title = ref("");
    const handleCancel = () => {
      jumpTo("/layout/setting/user");
    };
    watch(
      () => appStore.userModifyRow,
      (newVal, oldVal) => {
        console.log(newVal);
        title.value = newVal.titles;
        form.value = newVal.form;
        roleList.value = newVal.roleListData;
      },
      {
        deep: true,
        immediate: true,
      }
    );
    const handleBeforeOk = () => {
      let params = form;
      params.situsIdList = [5, 0, 17, 18, 19, 31, 32];
      if (title.value == "添加用户") {
        setUser.postUser(form.value).then(data => {
          jumpTo("/layout/setting/user");
        });
      } else {
        setUser.putUser(form.value).then(data => {
          jumpTo("/layout/setting/user");
        });
      }
    };
    return {
      handleCancel,
      handleBeforeOk,
      form,
      title,
      roleList,
      userId,
      dayjs,

      userTimeout: [
        {
          validator: (value, callback) => {
            if (value == undefined) {
              callback("请输入会话超时时间");
            } else {
              console.log(value < 86400 && value > 30);
              if (value > 86400 || value < 30) {
                callback("会话超时时间不正确");
              }
            }
          },
        },
      ],
      userRules: [
        {
          validator: async (value, callback) => {
            var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            if (value.length < 8 || reg.test(value)) {
              callback("用户名格式错误，请输入8~50位字符，且不可输入中文");
            } else {
              const data = await setUser.judgmentUserName(value);
              if (data.obj) {
                callback("用户名已存在");
              }
            }
          },
        },
      ],
      emailRules: [
        {
          validator: (value, callback) => {
            var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");
            if (!value) {
              callback("");
            } else if (!reg.test(value)) {
              callback("请输入正确邮箱");
            } else {
              callback();
            }
          },
        },
      ],
      passwordRules: [
        {
          validator: (value, callback) => {
            var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            if (!value) {
              callback("请输入密码");
            } else if (value.length < 8 || reg.test(value)) {
              callback("密码格式错误，请输入8~50位字符，且不可输入中文");
            }
          },
        },
      ],
      phoneRules: [
        {
          validator: (value, callback) => {
            var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]|[A-Za-z]|[#@$%*&?!]/;
            if (!value) {
              callback("");
            } else if (reg.test(value)) {
              callback("电话格式不正确，只可输入数字及+-符号");
            }
          },
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.addData {
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .bz {
    color: #f53f3f;
  }
  .box3 {
    width: 30%;
  }
  .box6 {
    width: 100%;
  }
}
.submits {
  margin-top: 20px;
  width: 30%;
  .arco-btn-size-medium {
    width: 30%;
    margin-left: 20px;
  }
}
.addHeader {
  padding: 20px 0 20px 20px;
  font-weight: 600;
}
.outerBox {
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;

  .centerBox {
    display: flex;
    text-align: center;
    line-height: 40px;
    .labels {
      background: #f7f8fa;
      width: 160px;
      height: 40px;
      border: 1px solid #e5e6eb;
    }
    .detail {
      width: 320px;
      height: 40px;
      border: 1px solid #e5e6eb;
    }
    .detail1 {
      width: 1280px;
      height: 40px;
      border: 1px solid #e5e6eb;
    }
  }
}
.units {
  width: 30px;
  text-align: center;
}
:deep(.arco-picker-size-medium) {
  width: 100%;
}
</style>
