<template>
  <a-table
    :data="colles"
    :row-key="rowKey"
    :scroll="{ y: 650 }"
    :row-selection="{ type: 'checkbox', showCheckedAll: true }"
    :pagination="{ total: pageTotal, showTotal: true, pageSize: pageSize, showJumper: true, showPageSize: true }"
    @select="checkItem"
    @select-all="checkItems"
    @page-change="pageChange"
    @page-size-change="pageSizeChange"
  >
    <template #columns>
      <a-table-column title="序号" data-index="index" />
      <a-table-column title="MAC地址" data-index="mac" />
      <a-table-column title="SN" data-index="sn" />
      <a-table-column title="工单号" data-index="orderNumber" />
      <a-table-column title="创建时间" data-index="createTime" />
      <a-table-column title="执行时间" data-index="executeTime" />
      <a-table-column title="备注" data-index="remark" />
      <a-table-column title="操作" width="150">
        <template #cell="{ record }">
          <control-buttons>
            <span class="primary-color" @click="actionList('detail', record)">详情</span>
            <span class="danger-color" @click="actionList('delete', record[rowKey])">删除</span>
          </control-buttons>
        </template>
      </a-table-column>
    </template>
  </a-table>

  <right-side rightBoxTitle="筛选" :showRightBox="modelValue" @closePops="emit('update:modelValue', false)" @reset="formRef.resetFields()" @confirm="search(condition)">
    <template v-slot:rightSidePopUpWindow>
      <a-form layout="vertical" :model="condition" ref="formRef">
        <a-form-item field="state" label="状态">
          <a-select v-model="condition.state" placeholder="please enter...">
            <a-option label="启用" value="0"></a-option>
            <a-option label="禁用" value="1"></a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="设备型号">
          <a-select field="" v-model="condition.value1" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="deviceMAC" label="MAC">
          <a-input v-model="condition.value1" placeholder="please enter..." />
        </a-form-item>
        <a-form-item field="deviceSN" label="SN">
          <a-input v-model="condition.deviceSN" placeholder="please enter..." />
        </a-form-item>
        <a-form-item field="configId" label="工单号">
          <a-input v-model="condition.configId" placeholder="please enter..." />
        </a-form-item>
        <a-form-item field="startTime" label="执行时间">
          <a-range-picker @change="" @select="" />
        </a-form-item>
      </a-form>
    </template>
  </right-side>

  <a-modal v-model:visible="delCurrentVisible" @cancel="handleCancel" @before-ok="handleBeforeOk">
    <template #title>提示</template>
    <div>确定删除当前配置吗？</div>
  </a-modal>

  <a-modal v-model:visible="delCheckVisible" @cancel="delCheckCancel" @before-ok="delCheckSubmit">
    <template #title>提示</template>
    <div>确定删除所选配置吗？</div>
  </a-modal>
</template>

<script setup>
import { getPreConfigColles, delPreConfigItem } from "@/services/api/jin.api";
import { ref, reactive, onMounted, toRefs, computed } from "vue";

const _props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change", "update:modelValue"]);
const { modelValue } = toRefs(_props);
const current = ref(1);
const pageSize = ref(30);
const pageTotal = ref(0);
const colles = ref([]);
const delCurrentVisible = ref(false);
const condition = reactive({ state: "", deviceMAC: "", deviceSN: "", configId: "", startTime: "" });
const formRef = ref(null);
let deleteId = null;
const rowKey = ref("configurationId");
let checkKeys = [];
const collesAllKeys = computed(() => colles.value.map(e => e[rowKey.value]));
const delCheckVisible = ref(false);

onMounted(() => {
  getData();
});

const getData = () => {
  let params = { page: current.value, size: pageSize.value };

  getPreConfigColles(params)
    .then(res => {
      const { data = [], total } = res.data;
      pageTotal.value = total;
      data.forEach((e, index) => (e.index = index + 1));
      colles.value = data;
    })
    .catch(err => {
      console.log(err);
    });
};

const pageChange = v => {
  current.value = v;
  getData();
};

const pageSizeChange = v => {
  pageSize.value = v;
  getData();
};

const handleCancel = () => {
  delCurrentVisible.value = false;
};

const handleBeforeOk = () => {
  deleteId &&
    delPreConfigItem(deleteId)
      .then(res => {
        if (res.data.status !== 200) return;

        getData();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        delCurrentVisible.value = false;
      });
};

const actionList = (action, data) => {
  if (action === "delete") {
    delCurrentVisible.value = true;
    deleteId = data;
  } else {
    emit("change", { action, data });
  }
};
const search = data => {
  console.log(data);
};

const checkItem = v => {
  checkKeys = v;
};

const checkItems = v => {
  checkKeys = v ? collesAllKeys.value : [];
};

const delChecks = () => {
  if (!checkKeys.length) return;

  delCheckVisible.value = true;
};

const delCheckCancel = () => {
  delCheckVisible.value = false;
};

const delCheckSubmit = () => {
  console.log("checkKeys", checkKeys);
};

defineExpose({ refresh: getData, delete: delChecks });
</script>

<style lang="less" scoped></style>
