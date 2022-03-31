<template>
  <div class="layout-page-view-wrapper">
    <div class="layout-page-view-controls">
      <NavButton type="primary" :onClick="createPermission" v-show="!showBreadCrumb">生成邀请码</NavButton>
      <a-button type="primary" @click="filters">筛选</a-button>
    </div>
    <CreatePermission v-show="showBreadCrumb" :titles="titles" :formData="form" @cancelAdd="hideBreadCrumb"></CreatePermission>
    <Table v-show="!showBreadCrumb" @showBread="showDetail" ref="tableData"></Table>
    <RightSide v-show="!showBreadCrumb && drawerVisible" :showpow="drawerVisible" @closePops="handleCancelDrawer()" @confirm="confirmDrawer()" @reset="resetDrawer()">
      <template v-slot:rightSidePopUpWindow>
        <div>
          <p>创建者</p>
          <a-input v-model="createBy" placeholder="please enter..." />
        </div>
        <div>
          <p>状态</p>
          <a-select v-model="enable" allow-clear placeholder="please enter...">
            <a-option label="启用" value="0"></a-option>
            <a-option label="禁用" value="1"></a-option>
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
import CreatePermission from "./components/add-perssions/index.vue";
import RightSide from "@/components/rightSidePopUpBox/index.vue";
import NavButton from "@/components/Nav/nav-button.vue";
import { ref, computed, watch } from "vue";
import { useNavigationStore } from "@/store";
export default {
  components: {
    Wrapper,
    Table,
    CreatePermission,
    RightSide,
    NavButton,
  },
  setup(props, context) {
    const showBreadCrumb = ref(false);
    const drawerVisible = ref(false);
    const tableData = ref(null);
    const showRightBox = ref(false);
    const breadList = ref([]);
    const titles = ref("");
    const createBy = ref("");
    const enable = ref("");
    const form = ref({});
    const navigationStore = useNavigationStore();
    const showDetail = data => {
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
    };
    const createPermission = (data, type) => {
      showBreadCrumb.value = true;
      form.value = {
        createBy: "",
        description: "",
        enable: "",
        expiredTime: "",
        invitationCode: "",
        needCheck: "",
        platformId: "",
        registerTime: "",
        roleId: "",
        userDescription: "",
        userExpiredTime: "",
        validTimes: "",
      };
      titles.value = "生成邀请码";
      return titles.value;
    };
    const hideBreadCrumb = data => {
      if (data) tableData._value.getData();
      showBreadCrumb.value = false;
      drawerVisible.value = false;
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
        createBy: createBy._value,
        enable: enable._value,
      });
    };
    const resetDrawer = () => {
      createBy.value = "";
      enable.value = [];
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
    return {
      hideBreadCrumb,
      filters,
      closeRightSide,
      handleCancelDrawer,
      createPermission,
      showDetail,
      confirmDrawer,
      resetDrawer,
      createBy,
      enable,
      showBreadCrumb,
      tableData,
      breadList,
      titles,
      form,
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
