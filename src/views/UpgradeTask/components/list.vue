<template>
  <a-table :data="colles" :scroll="{ y: 650 }" :pagination="false" :row-selection="{ type: 'checkbox', showCheckedAll: true }">
    <template #columns>
      <a-table-column title="序号" data-index="index" />
      <a-table-column title="厂商名" data-index="username" />
      <a-table-column title="OUI" data-index="roleNameZh" />
      <a-table-column title="设备类型Model" data-index="description" />
      <a-table-column title="升级文件" />
      <a-table-column title="目标版本" />
      <a-table-column title="升级规则" />
      <a-table-column title="自动升级">
        <template #cell="{ record }">
          <div class="vertical">关闭<a-switch size="mini" style="margin: 0 0 0 4px" /></div>
        </template>
      </a-table-column>

      <a-table-column title="操作" width="180">
        <template #cell="{ record }">
          <ControlButtons>
            <span class="primary-color" @click="actionList('modify', record)">修改文件</span>
            <span class="primary-color" @click="actionList('rules', record)">修改规则</span>
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
import { upgradeTask } from "@/services/api/jin.api";
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
const colles = ref([]);
const visible = ref(false);
const username = ref(123);

onMounted(() => {
  getData();
});

const getData = async (data = {}) => {
  let params = { page: current.value, size: pageSize.value, ...data };
  const dataInfo = await upgradeTask(params);
  console.log("dataInfo", dataInfo);
  dataInfo.data.data.forEach((e, index) => (e.index = index + 1));
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

defineExpose({ action: getData });
</script>

<style lang="less" scoped>
.test-cls {
  display: flex;
  align-items: center;
}
</style>
