<template>
  <div class="layout-page-view-wrapper">
    <div class="layout-page-view-controls" v-show="!child">
      <NavButton type="primary" size="large" :onClick="createPermission">添加权限集</NavButton>
    </div>
    <Table :tableData="tableData" v-show="!child" @modify="modify" @deleteSuccess="deleteSuccess" :tableNums="tableNums" @changePage="changePage" @changeSize1="changeSize1"></Table>
    <Resource></Resource>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import Wrapper from "@/components/wrapper/index.vue";
import Table from "./components/table/index.vue";
import Resource from "./components/resource/index.vue";
import { getPermissionListApi } from "@/services/api/system-settings";
import { useNavigationStore } from "@/store";
import NavButton from "@/components/Nav/nav-button.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Wrapper,
    Table,
    Resource,
    NavButton,
  },
  setup() {
    const router = useRouter();
    const navigationStore = useNavigationStore();
    const isModify = ref(false);
    const tableNums = ref(0);

    const modify = () => {
      isModify.value = true;
    };

    const deleteSuccess = () => {
      getData();
    };

    const tableData = ref([]);
    const currentPage = ref(1);
    const currentSize = ref(15);
    const getData = () => {
      getPermissionListApi(currentPage.value, currentSize.value).then(res => {
        tableData.value = [];
        const permissionData = res?.data;
        tableNums.value = permissionData.total;
        permissionData.data.forEach((item, index) => {
          let { permissionName, createBy, menus, permissionId } = item;
          const tableItem = {
            index: index + 1,
            permissionName: permissionName,
            createBy: createBy,
            menu: menus,
            permissionId: permissionId,
          };
          tableData.value.push(tableItem);
        });
      });
    };
    onBeforeMount(() => {
      getData();
    });

    const changePage = currentPage => {
      currentPage.value = currentPage;
      getData();
    };

    const changeSize1 = pageSize => {
      currentSize.value = pageSize;
      getData();
    };
    let child = computed(() => navigationStore.child);
    const createPermission = () => {
      router.push("/layout/setting/permission/add");
    };

    return {
      deleteSuccess,
      changePage,
      changeSize1,
      modify,
      createPermission,
      child,
      tableData,
      isModify,
      tableNums,
    };
  },
};
</script>
