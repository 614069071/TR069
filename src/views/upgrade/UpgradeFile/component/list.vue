<template>
  <div class="layout-page-view-wrapper">
    <div class="layout-page-view-controls">
      <a-button type="primary" @click="router.push('/layout/upgradeManagement/upgradeFile/add')">上传文件</a-button>
      <a-button type="primary" @click="delItems">删除</a-button>
      <a-button type="primary" @click="sideVisible = true">筛选</a-button>
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
              <span class="primary-color" @click="modifyFile(record)">修改</span>
              <span class="danger-color" @click="delItem(record[rowKey])">删除</span>
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

<script>
import { getUpgradeFiles, delUpgradeFile } from "@/services/api/jin.api";
import { ref, reactive, onMounted, computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "upgrade-file-list",
  setup() {
    const current = ref(1);
    const pageSize = ref(30);
    const pageTotal = ref(0);
    const visible = ref(false);
    const condition = reactive({ targetVersion: "", ouiName: "", deviceType: "" });
    const sideRef = ref(null);
    const rowKey = ref("upgradeFileId");
    const colles = ref([]);
    const collesAllKeys = computed(() => colles.value.map(e => e[rowKey.value]));
    const delCheckVisible = ref(false);
    const sideVisible = ref(false);
    let checkKeys = [];
    let fileId = null;
    const router = useRouter();

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

    const delItem = data => {
      visible.value = true;
      fileId = data;
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

    const delItems = () => {
      if (!checkKeys.length) return;

      delCheckVisible.value = true;
    };

    const delCheckCancel = () => {
      delCheckVisible.value = false;
    };

    const delCheckSubmit = () => {
      console.log("checkKeys", checkKeys);
    };

    const modifyFile = v => {
      const data = { current: v, list: colles.value };
      router.push("/layout/upgradeManagement/upgradeFile/modify");
      sessionStorage.setItem("_upgrade_file_modify_", JSON.stringify(data));
    };

    return {
      router,
      current,
      pageSize,
      pageTotal,
      visible,
      condition,
      sideRef,
      rowKey,
      colles,
      collesAllKeys,
      delCheckVisible,
      sideVisible,
      pageChange,
      pageSizeChange,
      getData,
      delItem,
      handleCancel,
      handleBeforeOk,
      checkItem,
      checkItems,
      delItems,
      delCheckCancel,
      delCheckSubmit,
      modifyFile,
    };
  },
});
</script>

<style lang="less" scoped></style>
