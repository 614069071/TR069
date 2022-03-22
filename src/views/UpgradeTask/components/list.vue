<template>
  <div>
    <a-table :data="colles" :scroll="{ y: 650 }" :pagination="false" :row-selection="{ type: 'checkbox', showCheckedAll: true }">
      <template #columns>
        <a-table-column title="序号" data-index="index" />
        <a-table-column title="厂商名" data-index="ouiName" />
        <a-table-column title="OUI" data-index="ouiName" />
        <a-table-column title="设备类型Model" data-index="deviceType" />
        <a-table-column title="升级文件" data-index="upgradeFileUrl">
          <template #cell="{ record }">
            <div>
              <img :src="record.upgradeFileUrl" alt="" />
            </div>
          </template>
        </a-table-column>
        <a-table-column title="目标版本" data-index="targetVersion" />
        <a-table-column title="升级规则" data-index="ouiName" />
        <a-table-column title="自动升级">
          <template #cell="{ record }">
            <div class="vertical">关闭<a-switch size="mini" style="margin: 0 0 0 4px" check-value="1" uncheck-value="0" v-model="record.autoUpgrade" /></div>
          </template>
        </a-table-column>

        <a-table-column title="操作" width="180">
          <template #cell="{ record }">
            <control-buttons>
              <span class="primary-color" @click="actionList('modify', record)">修改文件</span>
              <span class="primary-color" @click="actionList('rules', record)">修改规则</span>
            </control-buttons>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <Pagination :paginationData="paginationData" @changePage="handlePage" @changeSize="handleSize" />

    <right-side rightBoxTitle="筛选" :showRightBox="modelValue" @closePops="emit('update:modelValue', false)" @reset="side.resetFields()" @confirm="getData(condition)">
      <!-- <RightSide rightBoxTitle="筛选" @reset="reset" @confirm="search"> -->
      <template v-slot:rightSidePopUpWindow>
        <a-form layout="vertical" :model="condition" ref="side">
          <a-form-item field="targetVersion" label="目标版本">
            <a-input v-model="condition.targetVersion" placeholder="please enter..." />
          </a-form-item>
          <a-form-item field="ouiName" label="OUI">
            <a-input v-model="condition.ouiName" placeholder="please enter..." />
          </a-form-item>
          <a-form-item field="deviceType" label="设备类型">
            <a-input v-model="condition.deviceType" placeholder="please enter..." />
          </a-form-item>
          <a-form-item label="状态">
            <a-select placeholder="please enter...">
              <a-option label="所有" value="1"></a-option>
              <a-option label="在线" value="2"></a-option>
              <a-option label="离线" value="3"></a-option>
            </a-select>
          </a-form-item>
        </a-form>
      </template>
    </right-side>
  </div>

  <!-- <a-modal v-model:visible="visible" @cancel="handleCancel" @before-ok="handleBeforeOk">
    <template #title>提示</template>
    <div>确定删除当前配置吗？</div>
  </a-modal> -->
</template>

<script setup>
import { upgradeTask } from "@/services/api/jin.api";
import Pagination from "@/components/pagination/index.vue";
import RightSide from "@/components/rightSidePopUpBox/index.vue";
import ControlButtons from "@/components/ControlButtons/index.vue";
import { ref, reactive, onMounted, toRefs } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const { modelValue } = toRefs(props);

const emit = defineEmits(["change", "update:modelValue"]);

const current = ref(1);
const pageSize = ref(15);
const paginationData = ref(0);
const handlePage = page => {
  current.value = page;
  getData();
};

const handleSize = size => {
  pageSize.value = size;
  getData();
};

const colles = ref([]);

const getData = async (data = {}) => {
  let params = { page: current.value, size: pageSize.value, ...data };
  const dataInfo = await upgradeTask(params);
  dataInfo.data.data.forEach((e, index) => (e.index = index + 1));
  colles.value = dataInfo.data.data;
  paginationData.value = dataInfo.data.total;
};

const actionList = (action, data) => {
  if (action === "delete") {
    visible.value = true;
  } else {
    emit("change", { action, data });
  }
};

const condition = reactive({ targetVersion: "", ouiName: "", deviceType: "" });
let side = ref(null);

// const visible = ref(false);

// const handleCancel = () => {
//   visible.value = false;
// };

// const handleBeforeOk = () => {
//   visible.value = false;
// };

onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped></style>
