<template>
  <div>
    <div class="layout-page-view-controls">
      <a-button type="primary" @click="addUploadFile">上传文件</a-button>
      <a-button type="primary" @click="delChecks">删除</a-button>
      <a-button type="primary" @click="showFilter">筛选</a-button>
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
        <a-table-column title="升级文件" data-index="upgradeFileName" />
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
              <span class="danger-color" @click="actionList('delete', record[rowKey])">删除</span>
            </control-buttons>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <right-side rightBoxTitle="筛选" :showRightBox="sideVisible" @closePops="sideVisible = false" @reset="side.resetFields()" @confirm="getData">
      <template v-slot:rightSidePopUpWindow>
        <a-form layout="vertical" :model="condition" ref="sideRef">
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

  <a-modal v-model:visible="delCheckVisible" @cancel="delCheckCancel" @before-ok="delCheckSubmit">
    <template #title>提示</template>
    <div>确定删除所选升级文件吗？</div>
  </a-modal>
</template>

<script setup>
import { getUpgradeFiles, delUpgradeFile } from "@/services/api/jin.api";
import { ref, reactive, onMounted, computed } from "vue";

const emit = defineEmits(["change"]);

const current = ref(1);
const pageSize = ref(30);
const pageTotal = ref(0);
const visible = ref(false);
const condition = reactive({ targetVersion: "", ouiName: "", deviceType: "" });
const sideRef = ref(null);
const rowKey = ref("upgradeFileId");
const colles = ref([]);
const collesAllKeys = computed(() => colles.value.map(e => e[rowKey.value]));
let checkKeys = [];
const delCheckVisible = ref(false);
let fileId = null;
const sideVisible = ref(false);

const pageChange = v => {
  current.value = v;
  getData();
};

const pageSizeChange = v => {
  pageSize.value = v;
  getData();
};

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
    fileId = data;
  } else {
    const toModify = { current: ref(data), list: colles };

    emit("change", { action, data: toModify });
  }
};

const handleCancel = () => {
  visible.value = false;
};

const handleBeforeOk = () => {
  fileId &&
    delUpgradeFile(fileId)
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        visible.value = false;
      });
};

onMounted(() => {
  getData();
});

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

const showFilter = () => {
  sideVisible.value = true;
};

const addUploadFile = () => {
  emit("change", { action: "upload" });
};

defineExpose({ refresh: getData });
</script>

<style lang="less" scoped></style>
