<template>
  <div>
    <a-table
      :data="colles"
      :scroll="{ y: 650 }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :pagination="{ total: pageTotal, showTotal: true, pageSize: pageSize, showJumper: true, showPageSize: true }"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    >
      <template #columns>
        <a-table-column title="序号" data-index="index" />
        <a-table-column title="升级文件" data-index="upgradeFileUrl">
          <template #cell="{ record }">
            <div>
              <img :src="record.upgradeFileUrl" alt="" />
            </div>
          </template>
        </a-table-column>
        <a-table-column title="厂商OUI" data-index="ouiName" />
        <a-table-column title="设备类型" data-index="deviceType" />
        <a-table-column title="导入时间" data-index="uploadTime" />
        <a-table-column title="备注" data-index="remark" />
        <a-table-column title="状态">
          <template #cell="{ record }">{{ record.status ? "启用" : "禁用" }}</template>
        </a-table-column>
        <a-table-column title="操作" width="180">
          <template #cell="{ record }">
            <control-buttons>
              <span class="primary-color" @click="actionList('modify', record)">修改</span>
              <span class="danger-color" @click="actionList('delete', record.upgradeFileId)">删除</span>
            </control-buttons>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <right-side rightBoxTitle="筛选" :showRightBox="modelValue" @closePops="emit('update:modelValue', false)" @reset="side.resetFields()" @confirm="getData(condition)">
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
        </a-form>
      </template>
    </right-side>
  </div>

  <a-modal v-model:visible="visible" @cancel="handleCancel" @before-ok="handleBeforeOk">
    <template #title>提示</template>
    <div>确定删除当前升级文件吗？</div>
  </a-modal>
</template>

<script setup>
import { getUpgradeFiles } from "@/services/api/jin.api";
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
const pageSize = ref(30);
const pageTotal = ref(0);
const visible = ref(false);

const pageChange = v => {
  current.value = v;
  getData();
};

const pageSizeChange = v => {
  pageSize.value = v;
  getData();
};

const colles = ref([]);

const getData = async (data = {}) => {
  let params = { page: current.value, size: pageSize.value, ...data };
  const dataInfo = await getUpgradeFiles(params);

  getUpgradeFiles(params)
    .then(res => {
      const { data = [], total } = res.data;

      data.forEach((e, index) => (e.index = index + 1));
      colles.value = data;
      pageTotal.value = total;
    })
    .catch(err => {
      console.log(err);
    });
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

const handleCancel = () => {
  visible.value = false;
};

const handleBeforeOk = () => {
  visible.value = false;
};

onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped></style>
