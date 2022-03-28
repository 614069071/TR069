<template>
  <div class="layout-page-view-controls">
    <a-button type="primary" size="small" @click="addOrder">新增工单</a-button>
    <a-button type="primary" size="small" @click="bulkImport">批量导入</a-button>
    <a-button type="primary" size="small" @click="delChecks">删除</a-button>
    <a-button type="primary" size="small" @click="showFilter">筛选</a-button>
  </div>

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

  <right-side rightBoxTitle="筛选" :showRightBox="sideVisible" @closePops="sideVisible = false" @reset="formRef.resetFields()" @confirm="search">
    <template v-slot:rightSidePopUpWindow>
      <a-form layout="vertical" :model="condition" ref="formRef">
        <a-form-item field="mac" label="MAC">
          <a-input v-model="condition.mac" placeholder="please enter..." />
        </a-form-item>
        <a-form-item field="sn" label="SN">
          <a-input v-model="condition.sn" placeholder="please enter..." />
        </a-form-item>
        <a-form-item field="orderNmuber" label="工单号">
          <a-input v-model="condition.orderNmuber" placeholder="please enter..." />
        </a-form-item>
        <a-form-item field="startTime" label="起始时间">
          <a-date-picker show-time format="YYYY-MM-DD hh:mm" v-model="condition.startTime" />
        </a-form-item>
        <a-form-item field="endTime" label="结束时间">
          <a-date-picker show-time format="YYYY-MM-DD hh:mm" v-model="condition.endTime" />
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
import { delPreConfigItem, delCheckPreConfigItems, filterPreConfigColles } from "@/services/api/jin.api";
import { ref, reactive, onMounted, computed } from "vue";

const emit = defineEmits(["change"]);
const current = ref(1);
const pageSize = ref(30);
const pageTotal = ref(0);
const colles = ref([]);
const delCurrentVisible = ref(false);
const condition = reactive({ mac: "", sn: "", orderNmuber: "", startTime: "", endTime: "" });
const formRef = ref(null);
let deleteId = null;
const rowKey = ref("configurationId");
let checkKeys = [];
const collesAllKeys = computed(() => colles.value.map(e => e[rowKey.value]));
const delCheckVisible = ref(false);
const sideVisible = ref(false);

const addOrder = () => {
  emit("change", { action: "add" });
};
const bulkImport = () => {
  alert("还没做");
};
const deleteAll = () => {};

onMounted(() => {
  getData();
});

const getData = () => {
  filterPreConfigColles(condition)
    .then(res => {
      const { data, total } = res.data;

      pageTotal.value = total;
      data.forEach((e, index) => (e.index = index + 1));
      colles.value = data;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      sideVisible.value = false;
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
const search = () => {
  current.value = 1;

  getData();
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
  delCheckPreConfigItems(checkKeys)
    .then(res => {
      if (res.data.status === 200) {
        getData();
      }
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      delCheckVisible.value = false;
    });
};

const showFilter = () => {
  sideVisible.value = true;
};

defineExpose({ refresh: getData });
</script>

<style lang="less" scoped></style>
