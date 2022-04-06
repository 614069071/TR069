<template>
  <OperationWrapper :title="title">
    <template v-slot:formContent>
      <div v-show="title != '详情'" class="newBox">
        <a-form layout="vertical" :model="form" @submit-success="handleBeforeOk">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="账号角色" field="roleId" required>
                <a-select v-model="form.roleId" placeholder="Please select ...">
                  <a-option v-for="role in roleList" :key="role.roleId" :label="role.roleNameZh" :value="role.roleId"></a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="账号过期时间" field="userExpiredTime" required>
                <a-date-picker v-model="form.userExpiredTime" show-time :disabledDate="current => dayjs(current).isBefore(dayjs())" style="width: 360px" format="YYYY-MM-DD HH:mm:ss" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="账号描述" field="userDescription">
                <a-textarea v-model="form.userDescription" placeholder="Please enter something" maxLength="255" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="邀请码有效次数" field="validTimes" :rules="validTimesRules" :validate-trigger="['change', 'blur']" required>
                <a-input v-model="form.validTimes" type="number" placeholder="please enter..." />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="邀请码过期时间" field="expiredTime" required>
                <a-date-picker v-model="form.expiredTime" show-time :disabledDate="current => dayjs(current).isBefore(dayjs())" style="width: 360px" format="YYYY-MM-DD HH:mm:ss" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="邀请码描述" field="description">
                <a-textarea v-model="form.description" placeholder="Please enter something" maxLength="255" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="是否需要再次确认" field="needCheck" required>
                <a-select v-model="form.needCheck" placeholder="Please select ...">
                  <a-option v-for="item in needCheckList" :key="item.value" :label="item.label" :value="item.value"></a-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item>
                <a-space>
                  <a-button @click="handleCancel">取消</a-button>
                  <a-button html-type="submit" @submit-success="handleBeforeOk" type="primary">确定</a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div>
        <div v-show="title == '详情'" class="outerBox">
          <div class="centerBox">
            <div class="labels">邀请码</div>
            <div class="detail">{{ form.invitationCode }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">创建人</div>
            <div class="detail">{{ form.createBy }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">账号角色</div>
            <div class="detail">{{ form.roleNameZh }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">账号过期时间</div>
            <div class="detail1">{{ form.userExpiredTime }}</div>
          </div>
          <div class="centerBox">
            <div class="labels" style="height: 100px;">账号描述</div>
            <div class="detail1" style="height: 100px;">{{ form.userDescription }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">邀请码有效次数</div>
            <div class="detail">{{ form.validTimes }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">邀请码过期时间</div>
            <div class="detail">{{ form.expiredTime }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">邀请码创建时间</div>
            <div class="detail">{{ form.registerTime }}</div>
          </div>
          <div class="centerBox">
            <div class="labels" style="height: 100px;">邀请码描述</div>
            <div class="detail1" style="height: 100px;">{{ form.description }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">是否需要再次确认</div>
            <div class="detail1">{{ form.needCheck == 1 ? "是" : "否" }}</div>
          </div>
        </div>
        <a-button html-type="submit" v-show="title == '详情'" @click="handleCancel">取消</a-button>
      </div>
    </template>
  </OperationWrapper>
</template>

<script>
import OperationWrapper from "@/components/operation-wrapper/index.vue";
import { Message } from "@arco-design/web-vue";
import dayjs from "dayjs";
import { invitationCodeManagement, setUser } from "@/services/api/system-settings";
import { ref, onMounted, watch } from "vue";
import { useAppStore } from "@/store";
import { jumpTo } from "@/utils/common";
export default {
  components: {
    OperationWrapper,
  },
  setup(props, context) {
    const appStore = useAppStore();
    const menuType = ref([]);
    const roleList = ref([]);
    const needCheckList = ref([
      { label: "是", value: "1" },
      { label: "否", value: "0" },
    ]);
    const form = ref({});
    const RoleList = async () => {
      const dataInfo = await setUser.getRoleList();
      roleList.value = dataInfo;
    };
    const title = ref("");
    watch(
      () => appStore.invitationCreation,
      newVal => {
        console.log(newVal);
        title.value = newVal.titles;
        form.value = newVal.form;
      },
      {
        deep: true,
        immediate: true,
      }
    );

    const handleCancel = () => {
      jumpTo("/layout/setting/invitation");
    };
    const handleBeforeOk = () => {
      let message = "";
      let dataInfo = form.value;
      roleList.value.forEach(item => {
        if (item.roleId == dataInfo.roleId) {
          dataInfo.roleNameZh = item.roleNameZh;
        }
      });
      if (form.value.userExpiredTime < form.value.expiredTime) {
        message = "账号过期时间必须晚于邀请码过期时间";
      }
      if (message) {
        Message.error({
          id: "httpInfo",
          content: message,
          duration: 2000,
          position: "top",
        });
        return;
      }
      invitationCodeManagement.newInvitation(form.value).then(data => {
        jumpTo("/layout/setting/invitation");
      });
    };
    onMounted(() => {
      RoleList();
    });
    return {
      title,
      roleList,
      needCheckList,
      handleCancel,
      handleBeforeOk,
      form,
      menuType,
      dayjs,
      validTimesRules: [
        {
          validator: async (value, callback) => {
            if (value < 1) {
              callback("次数需大于0");
            }
          },
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.newBox {
  width: 750px;
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
    text-align: left;
    line-height: 40px;
    .labels {
      text-align: center;
      background: #f7f8fa;
      width: 160px;
      height: 40px;
      border: 1px solid #e5e6eb;
    }
    .detail {
      width: 320px;
      height: 40px;
      padding-left: 20px;
      border: 1px solid #e5e6eb;
    }
    .detail1 {
      width: 1280px;
      height: 40px;
      padding-left: 20px;
      border: 1px solid #e5e6eb;
    }
  }
}
</style>
