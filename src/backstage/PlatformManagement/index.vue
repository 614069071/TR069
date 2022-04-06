<template>
  <div class="layout-page-view-wrapper">
    <div class="layout-page-view-controls" v-show="!child">
      <NavButton type="primary" size="large" :onClick="addPlatform">新增</NavButton>
      <a-button type="primary" @click="filters">筛选</a-button>
    </div>
    <Table v-show="!child" ref="tableData"></Table>
    <RightSide v-show="drawerVisible" :showpow="drawerVisible" @closePops="handleCancelDrawer()" @confirm="confirmDrawer()" @reset="resetDrawer()">
      <template v-slot:rightSidePopUpWindow>
        <div>
          <p>平台名称</p>
          <a-input v-model="platformName" placeholder="please enter..." />
        </div>
        <div>
          <p>启用状态</p>
          <a-select v-model="enable" allow-clear placeholder="please enter...">
            <a-option label="启用" value="1"></a-option>
            <a-option label="禁用" value="0"></a-option>
          </a-select>
        </div>
      </template>
    </RightSide>
  </div>
</template>

<script>
// import { putUser, postUser } from '@/services/api/system-settings'
import { computed } from "vue";
import Table from "./components/table/index.vue";
import Wrapper from "@/components/wrapper/index.vue";
import CreatePermission from "./components/add-perssions/index.vue";
import RightSide from "@/components/rightSidePopUpBox/index.vue";
import { ref } from "vue";
import { useNavigationStore, useAppStore } from "@/store";
import NavButton from "@/components/Nav/nav-button.vue";
import { jumpTo } from "@/utils/common";
export default {
  components: {
    Wrapper,
    Table,
    CreatePermission,
    RightSide,
    NavButton,
  },
  setup(props, context) {
    const navigationStore = useNavigationStore();
    const appStore = useAppStore();
    const drawerVisible = ref(false);
    const showRightBox = ref(false);
    const refreshData = ref(false);
    const tableData = ref(null);
    const titles = ref("");
    const platformName = ref("");
    const enable = ref("");
    const form = ref({});

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
      tableData.value.getData({
        platformName: platformName.value,
        enable: enable.value,
      });
    };
    const resetDrawer = () => {
      platformName.value = "";
      enable.value = [];
    };
    let child = computed(() => navigationStore.child);
    const addPlatform = () => {
      titles.value = "新增";
      form.value = {
        description: "",
        deviceOnline: "",
        deviceTotal: "",
        enable: 1,
        expiredTime: "",
        identificationCode: "",
        logo: "",
        maxUser: "",
        menuType: "",
        platformCode: "",
        platformName: "",
        registerTime: "",
        rootPassword: "",
        rootUsername: "",
        timeZone: "",
        userOnline: "",
        userTotal: "",
      };
      const dataObj = {
        form: form.value,
        titles: "新增",
      };
      appStore.updateSettings({ platformCreation: dataObj });
      jumpTo("/backstage/platformManagement/add");
    };
    const hideBreadCrumb = data => {
      tableData.value.getData();
    };
    return {
      filters,
      closeRightSide,
      handleCancelDrawer,
      resetDrawer,
      confirmDrawer,
      addPlatform,
      hideBreadCrumb,
      child,
      platformName,
      enable,
      refreshData,
      titles,
      form,
      tableData,
      drawerVisible,
      showRightBox,
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
