<template>
  <OperationWrapper :title="title">
    <template v-slot:formContent>
      <div>
        <a-form layout="vertical" :model="form" @submit-success="handleBeforeOk">
          <a-row :gutter="40">
            <a-col :span="8">
              <a-form-item label="角色名" field="roleNameZh" maxLength="50" required :rules="title == '添加用户' ? roleRules : []" :validate-trigger="['change', 'blur']">
                <a-input v-model="form.roleNameZh" placeholder="please enter..." />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="权限集" field="selectedPermissions" required>
                <a-select :size="size" v-model="form.selectedPermissions" placeholder="Please select ..." multiple>
                  <a-option v-for="item in roleList" :key="item.value" :value="item.value" :label="item.label"></a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="描述">
                <a-textarea v-model="form.description" maxLength="255" placeholder="Please enter something" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item>
                <a-space>
                  <a-button @click="handleCancel">取消</a-button>
                  <a-button html-type="submit" type="primary" @submit-success="handleBeforeOk">确定</a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- <div>
        <div v-if="title=='详情'"
             class="outerBox">
          <div class="centerBox">
            <div class="labels">角色名</div>
            <div class="detail">{{form.username}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">权限集</div>
            <div class="detail">{{form.email}}</div>
          </div>

          <div class="centerBox">
            <div class="labels">描述</div>
            <div class="detail1">{{form.description}}</div>
          </div>

        </div>
        <a-button html-type="submit"
                  v-show="title=='详情'"
                  @click="handleCancel">取消</a-button>
      </div> -->
    </template>
  </OperationWrapper>
</template>

<script>
import OperationWrapper from "@/components/operation-wrapper/index.vue";
import { roleManagement } from "@/services/api/system-settings";
import { ref, onMounted, watch, computed } from "vue";
import { useAppStore } from "@/store";
import { jumpTo } from "@/utils/common";
export default {
  components: {
    OperationWrapper,
  },

  setup(props, context) {
    const appStore = useAppStore();
    const roleList = ref([]);
    const form = ref({});
    const title = ref("");
    const getRole = async () => {
      let datas = [];
      const dataInfo = await roleManagement.getPermissionList();
      dataInfo.forEach(item => {
        let dataInfo = { label: item.permissionName, value: item.permissionId };
        datas.push(dataInfo);
      });
      roleList.value = datas;
    };
    watch(
      () => appStore.roleModifyCreation,
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
      jumpTo("/layout/setting/role");
    };
    const handleBeforeOk = done => {
      console.log(title.value, 1);
      let params = form.value;
      params.permissions = [];
      params.selectedPermissions.forEach(item => {
        let dataInfo = { permissionId: item };
        params.permissions.push(dataInfo);
      });
      console.log(title.value, 1);
      if (title.value === "添加角色") {
        roleManagement.newRole(params).then(data => {
          jumpTo("/layout/setting/role");
        });
      } else {
        roleManagement.putRole(params).then(data => {
          jumpTo("/layout/setting/role");
        });
      }
      // done()
    };
    onMounted(() => {
      getRole();
    });
    return {
      getRole,
      handleCancel,
      handleBeforeOk,
      form,
      roleList,
      title,
      roleRules: [
        {
          validator: async (value, callback) => {
            const data = await roleManagement.judgmentRoleName(value);
            if (data.obj) {
              callback("角色名已存在");
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
  width: calc(60% - 40px);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .bz {
    color: #f53f3f;
  }
  .box3 {
    width: 46%;
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
</style>
