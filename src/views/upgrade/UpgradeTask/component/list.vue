<template>
  <div class="layout-page-view-wrapper">
    <div class="layout-page-view-controls">
      <a-button type="primary" size="small" @click="jumpTo('add')">创建任务</a-button>
      <a-button type="primary" size="small" @click="sideVisible = true">筛选</a-button>
    </div>

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
        <a-table-column title="厂商名" data-index="manufacturer" />
        <a-table-column title="OUI" data-index="ouiName" />
        <a-table-column title="设备类型Model" data-index="deviceType" />
        <a-table-column title="升级文件" data-index="upgradeFileName" />
        <a-table-column title="目标版本" data-index="targetVersion" />
        <a-table-column title="升级规则" data-index="upgradeRuleId" />
        <a-table-column title="自动升级">
          <template #cell="{ record }">
            <div class="vertical">关闭<a-switch size="mini" style="margin: 0 0 0 4px" check-value="1" uncheck-value="0" v-model="record.autoUpgrade" /></div>
          </template>
        </a-table-column>

        <a-table-column title="操作" width="180">
          <template #cell="{ record }">
            <control-buttons>
              <span class="primary-color" @click="jumpTo('modify', record)">修改文件</span>
              <span class="primary-color" @click="jumpTo('rule', record)">修改规则</span>
            </control-buttons>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <right-side rightBoxTitle="筛选" :showRightBox="sideVisible" @closePops="sideVisible = false" @reset="sideRef.resetFields()" @confirm="getData(condition)">
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
</template>

<script>
import { upgradeTask } from "@/services/api/jin.api";
import { ref, reactive, onMounted, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "upgrade-task-list",
  setup() {
    const current = ref(1);
    const pageSize = ref(30);
    const pageTotal = ref(0);
    const sideVisible = ref(false);
    const router = useRouter();
    const condition = reactive({ targetVersion: "", ouiName: "", deviceType: "" });
    const sideRef = ref(null);
    const colles = ref([]);

    const pageChange = v => {
      current.value = v;
      getData();
    };

    const pageSizeChange = v => {
      pageSize.value = v;
      getData();
    };

    const getData = (data = {}) => {
      let params = { page: current.value, size: pageSize.value, ...data };

      upgradeTask(params)
        .then(res => {
          res.data.data.forEach((e, index) => (e.index = index + 1));
          colles.value = res.data.data;
          pageTotal.value = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    };

    const jumpTo = (action, data) => {
      const link = `/layout/upgradeManagement/upgradeTask/${action}`;

      router.push(link);

      data && sessionStorage.setItem("_upgrade_task_item_", JSON.stringify(data));
    };

    onMounted(() => {
      getData();
    });

    return {
      pageSize,
      pageTotal,
      sideVisible,
      colles,
      condition,
      sideRef,
      pageChange,
      pageSizeChange,
      jumpTo,
    };
  },
});
</script>

<style lang="less" scoped></style>
