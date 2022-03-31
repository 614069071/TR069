<template>
  <div class="layout-page-view-wrapper">
    <div class="layout-page-view-controls" v-show="!showBreadCrumb">
      <NavButton type="primary" :onClick="createPermission">添加用户</NavButton>
      <a-button type="primary" @click="filters">筛选</a-button>
    </div>
    <CreatePermission v-show="showBreadCrumb" :titles="titles" :formData="form" :roleListData="roleList" @cancelAdd="hideBreadCrumb"></CreatePermission>
    <Table v-show="!showBreadCrumb" @showBread="showDetail" ref="tableData"></Table>
    <RightSide v-show="!showBreadCrumb && drawerVisible" :showpow="drawerVisible" @closePops="handleCancelDrawer()" @confirm="confirmDrawer()" @reset="resetDrawer()">
      <template v-slot:rightSidePopUpWindow>
        <div>
          <p>用户名</p>
          <a-input v-model="username" placeholder="please enter..." />
        </div>
        <div>
          <p>角色</p>
          <a-select v-model="roleId" allow-clear placeholder="Please select ...">
            <a-option v-for="role in roleList" :key="role.roleId" :label="role.roleNameZh" :value="role.roleId"></a-option>
          </a-select>
        </div>
        <div>
          <p>用户状态</p>
          <a-select v-model="enable" allow-clear placeholder="please enter...">
            <a-option label="禁用" value="0"></a-option>
            <a-option label="待确认" value="2"></a-option>
            <a-option label="在线" value="3"></a-option>
            <a-option label="离线" value="4"></a-option>
          </a-select>
        </div>
      </template>
    </RightSide>
  </div>
</template>

<script>
// import { putUser, postUser } from '@/services/api/system-settings'
import Table from "./components/table/index.vue";
import Wrapper from "@/components/wrapper/index.vue";
import { setUser } from "@/services/api/system-settings";
import CreatePermission from "./components/add-perssions/index.vue";
// import RightSide from '@/components/rightSidePopUpBox/index.vue'
import { ref, watch, onMounted } from "vue";
import { useNavigationStore } from "@/store";
export default {
  components: {
    Wrapper,
    Table,
    CreatePermission,
  },
  setup(props, context) {
    const showBreadCrumb = ref(false);
    const drawerVisible = ref(false);
    const showRightBox = ref(false);
    const breadList = ref([]);
    const tableData = ref(null);
    const titles = ref("");
    const username = ref("");
    const roleId = ref("");
    const online = ref("");
    const form = ref({});
    const roleList = ref([]);
    const getRoleList = async () => {
      const dataInfo = await setUser.getRoleList();
      roleList.value = dataInfo;
      console.log(roleList);
    };
    const navigationStore = useNavigationStore();
    const createPermission = (data, type) => {
      showBreadCrumb.value = true;
      form.value = {
        roleId: "",
        username: "",
        password: "",
        parentId: "",
        platformId: "",
        enable: 1,
        avatar: "",
        email: "",
        phone: "",
        registerTime: "",
        expiredTime: "2099-01-01 00:00:00",
        firstLogin: 1,
        sessionTimeout: 600,
        description: "",
        enabled: false,
      };

      titles.value = "添加用户";
      return titles.value;
    };
    const showDetail = (data, type) => {
      if (!type) {
        for (let val in data) {
          if (data[val]) {
            form._value[val] = data[val];
          } else {
            form._value[val] = "";
          }
        }
        titles.value = "修改";
        showBreadCrumb.value = true;
        navigationTo(function commonModify() {});
      } else {
        for (let val in data) {
          if (data[val]) {
            form._value[val] = data[val];
          } else {
            form._value[val] = "";
          }
        }
        titles.value = "详情";
        showBreadCrumb.value = true;
        navigationTo(function commonDetail() {});
      }
    };
    const hideBreadCrumb = data => {
      if (data) tableData._value.getData();
      showBreadCrumb.value = false;
      const navigationStore = useNavigationStore();
      navigationStore.updateChild(null);
    };
    const filters = data => {
      drawerVisible.value = true;
    };
    const closeRightSide = data => {
      drawerVisible.value = true;
    };
    const handleCancelDrawer = data => {
      drawerVisible.value = false;
    };
    const confirmDrawer = () => {
      tableData._value.getData({
        username: username._value,
        roleId: roleId._value,
        online: online._value,
      });
    };
    const resetDrawer = () => {
      username.value = "";
      roleId.value = "";
      online.value = "";
    };
    watch(
      () => navigationStore.child,
      newVal => {
        if (newVal == null) {
          drawerVisible.value = false;
          showBreadCrumb.value = false;
        }
      },
      {
        immediate: true,
      }
    );
    onMounted(() => {
      getRoleList();
    });
    return {
      createPermission,
      hideBreadCrumb,
      filters,
      closeRightSide,
      handleCancelDrawer,
      showDetail,
      confirmDrawer,
      resetDrawer,
      getRoleList,
      roleList,
      showBreadCrumb,
      breadList,
      titles,
      form,
      tableData,
      drawerVisible,
      showRightBox,
      username,
      online,
    };
  },
};
</script>

<style lang="less" scoped>
.platform {
  width: 100%;
  height: 100%;
}
.dalst {
  padding: 0 10px;
  cursor: pointer;
}
.bod {
  border-right: 1px solid #e5e6e8;
  color: #165dff;
}
.col {
  color: red;
}
.outerLayer {
  display: flex;
  margin-bottom: 20px;
  .contentxt {
    width: 48%;
    display: flex;
    justify-content: space-between;
  }
}
.addData {
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .bz {
    color: red;
  }
  .box3 {
    width: 30%;
  }
  .box6 {
    width: 65%;
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
</style>
