<template>
  <a-table :data="colles.value" :scroll="{ y: 650 }" :pagination="false" :row-selection="{ type: 'checkbox', showCheckedAll: true }">
    <template #columns>
      <a-table-column title="序号" data-index="index" />
      <a-table-column title="MAC地址" data-index="username" />
      <a-table-column title="SN" data-index="roleNameZh" />
      <a-table-column title="工单号" data-index="description" />
      <a-table-column title="创建时间" />
      <a-table-column title="执行时间" />
      <a-table-column title="备注" />
      <a-table-column title="操作" width="150">
        <template #cell="{ record }">
          <ControlButtons>
            <span class="primary-color" @click="actionList('detail', record)">详情</span>
            <span class="danger-color" @click="actionList('delete', record)">删除</span>
          </ControlButtons>
        </template>
      </a-table-column>
    </template>
  </a-table>

  <Pagination :paginationData="paginationData" @changePage="handlePage" @changeSize="handleSize"></Pagination>

  <a-modal v-model:visible="visible" @cancel="handleCancel" @before-ok="handleBeforeOk">
    <template #title>提示</template>
    <div>确定删除当前配置吗？</div>
  </a-modal>
</template>

<script setup>
import { getPreConfigColles } from "@/services/api/jin.api";
import { roleManagement } from "@/services/api/system-settings";
import Pagination from "@/components/pagination/index.vue";
import RightSide from "@/components/rightSidePopUpBox/index.vue";
import ControlButtons from "@/components/ControlButtons/index.vue";
import { ref, reactive, onMounted } from "vue";

defineProps({
  drawerVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change"]);
const current = ref(1);
const pageSize = ref(15);
const paginationData = ref(0);
const colles = reactive({ value: [] });
const visible = ref(false);
const username = ref(123);

onMounted(() => {
  getData();
});

const getData = async () => {
  let params = { username: "", page: current.value, size: pageSize.value };
  // const dataInfo = await getPreConfigColles(params);
  const dataInfo = await roleManagement.getRole(params);
  console.log("dataInfo", dataInfo);
  dataInfo.data.forEach((e, index) => (e.index = index + 1));
  colles.value = dataInfo.data;
  paginationData.value = dataInfo.total;
};

const handlePage = (current) => {
  current.value = current;
  getData();
};

const handleSize = (pageSize) => {
  pageSize.value = pageSize;
  getData();
};

const handleCancel = () => {
  visible.value = false;
};

const handleBeforeOk = () => {
  visible.value = false;
};

const actionList = (action, data) => {
  if (action === "delete") {
    visible.value = true;
  } else {
    emit("change", { action, data });
  }
};
</script>

<style lang="less" scoped></style>
