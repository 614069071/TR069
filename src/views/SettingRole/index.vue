<template>
  <div class="layout-page-view-wrapper">
    <div class="layout-page-view-controls" v-show="!showBreadCrumb">
      <NavButton type="primary" :onClick="createPermission">添加角色</NavButton>
      <a-button type="primary" @click="filters">筛选</a-button>
    </div>
    <Table v-show="!showBreadCrumb" @showBread="showDetail" ref="tableData"></Table>
    <RightSide v-show="!showBreadCrumb && drawerVisible" :showpow="drawerVisible" @closePops="handleCancelDrawer()" @confirm="confirmDrawer()" @reset="resetDrawer()">
      <template v-slot:rightSidePopUpWindow>
        <div>
          <p>角色名称</p>
          <a-input v-model="roleName" placeholder="please enter..." />
        </div>
        <div>
          <p>权限集</p>
          <a-select :size="size" v-model="permissionIdList" allow-clear placeholder="Please select ..." multiple>
            <a-option v-for="item in roleList" :key="item.value" :value="item.value" :label="item.label"></a-option>
          </a-select>
          <!-- <a-input v-model="permissionIdList"
                   placeholder="please enter..." /> -->
        </div>
      </template>
    </RightSide>
  </div>
</template>

<script>
// import { putUser, postUser } from '@/services/api/system-settings'
import Table from "./components/table/index.vue";
import Wrapper from "@/components/wrapper/index.vue";
import { roleManagement } from "@/services/api/system-settings";
import RightSide from "@/components/rightSidePopUpBox/index.vue";
import { useNavigationStore } from "@/store";
import { ref, watch, onMounted } from "vue";
import { useAppStore } from "@/store";
import { jumpTo } from "@/utils/common";
export default {
  components: {
    Wrapper,
    Table,
    RightSide,
  },
  setup(props, context) {
    const appStore = useAppStore();
    const showBreadCrumb = ref(false);
    const drawerVisible = ref(false);
    const breadList = ref([]);
    const permissionIdList = ref([]);
    const titles = ref("");
    const roleName = ref("");
    const tableData = ref(null);
    const form = ref({});
    const roleList = ref([]);
    const getRole = async () => {
      let datas = [];
      const dataInfo = await roleManagement.getPermissionList();
      dataInfo.forEach(item => {
        let dataInfo = { label: item.permissionName, value: item.permissionId };
        datas.push(dataInfo);
      });
      roleList.value = datas;
    };
    const navigationStore = useNavigationStore();
    const createPermission = data => {
      const dataObj = {
        form: {
          description: "",
          permissions: [],
          platformId: "",
          roleName: "",
          roleNameZh: "",
          selectedPermissions: [],
        },
        titles: "添加角色",
      };
      appStore.updateSettings({ roleModifyCreation: dataObj });
      jumpTo("/layout/setting/role/add");
    };
    const showDetail = (data, type) => {
      data.selectedPermissions = [];
      data.permissions.forEach(item => {
        data.selectedPermissions.push(item.permissionId);
      });
      let dataForm = {};
      console.log(data);
      for (let val in data) {
        if (data[val]) {
          dataForm[val] = data[val];
        } else {
          dataForm[val] = "";
        }
      }
      const dataObj = {
        form: dataForm,
        titles: type ? "详情" : "修改",
      };
      appStore.updateSettings({ roleModifyCreation: dataObj });
      jumpTo("/layout/setting/role/revise");
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
    const filters = () => {
      drawerVisible.value = true;
    };
    const closeRightSide = () => {
      drawerVisible.value = true;
    };
    const handleCancelDrawer = () => {
      drawerVisible.value = false;
    };
    const confirmDrawer = () => {
      tableData.value.getData({
        roleName: roleName.value,
        permissionIdList: permissionIdList.value.toString(),
      });
    };
    const resetDrawer = () => {
      roleName.value = "";
      permissionIdList.value = [];
    };
    onMounted(() => {
      getRole();
    });
    return {
      createPermission,
      filters,
      closeRightSide,
      handleCancelDrawer,
      confirmDrawer,
      resetDrawer,
      showDetail,
      getRole,
      roleList,
      roleName,
      permissionIdList,
      showBreadCrumb,
      tableData,
      breadList,
      titles,
      form,
      drawerVisible,
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
