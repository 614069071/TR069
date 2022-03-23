<template>
  <Wrapper title="预配置" :breadList="breadList" :showBreadCrumb="showBreadCrumb">
    <template v-slot:operation>
      <a-button type="primary" size="small" @click="controlHandle('add')">新增工单</a-button>
      <a-button type="primary" size="small" @click="controlHandle('import')">批量导入</a-button>
      <a-button type="primary" size="small" @click="controlHandle('delete')">删除</a-button>
      <a-button type="primary" size="small" @click="filterList">筛选</a-button>
    </template>

    <template v-slot:contentMain>
      <div v-show="configType === 'list'">
        <List @change="listChangeHandle" v-model="sideVisible" />
      </div>

      <div v-show="configType === 'add'">
        <Create @change="comeBack" />
      </div>

      <div v-show="configType === 'detail'">
        <Detail :data="detailData" />
      </div>
    </template>
  </Wrapper>
</template>

<script setup>
import List from "./components/list.vue";
import Create from "./components/add.vue";
import Detail from "./components/detail.vue";
import Wrapper from "@/components/wrapper/index.vue";
import { reactive, ref } from "vue";

const showBreadCrumb = ref(false);
const breadList = reactive(["终端管理", "设备管理", "预配置"]);
const configType = ref("list"); //add delete import detail
const sideVisible = ref(false);
const detailData = ref({});

const controlHandle = type => {
  sideVisible.value = false;

  if (type == "add") {
    showBreadCrumb.value = true;
    configType.value = type;
    breadList.splice(3, 1, "新增工单");
  } else if (type == "import") {
  } else if (type == "delete") {
  }
};

const comeBack = () => {
  configType.value = "list";
  showBreadCrumb.value = false;
};

const listChangeHandle = ({ action, data }) => {
  if (action === "detail") {
    configType.value = "detail";
    showBreadCrumb.value = true;
    breadList.splice(3, 1, "详情");
    detailData.value = data;
  }
};

const filterList = () => {
  sideVisible.value = true;
};
</script>

<style lang="less" scoped></style>
