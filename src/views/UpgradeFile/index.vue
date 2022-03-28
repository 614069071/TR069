<template>
  <div class="layout-page-view-wrapper">
    <div v-show="configType === 'list'">
      <List @change="listChangeHandle" ref="listRef" />
    </div>

    <div v-show="configType === 'upload'">
      <Create @change="addCallback" />
    </div>

    <div v-show="configType === 'modify'">
      <Modify @change="comeBack" :data="modifyData" />
    </div>

    <div v-show="configType === 'rules'">
      <Rules @change="comeBack" />
    </div>
  </div>
</template>

<script setup>
import List from "./components/list.vue";
import Create from "./components/add.vue";
import Modify from "./components/modify.vue";
import Rules from "./components/rules.vue";
import { reactive, ref } from "vue";

const showBreadCrumb = ref(false);
const configType = ref("list"); //add delete import detail
const sideVisible = ref(false);
const listRef = ref(null);
const modifyData = ref({});

const controlHandle = type => {
  sideVisible.value = false;
  showBreadCrumb.value = true;
  configType.value = type;

  if (type == "upload") {
  } else if (type == "delete") {
  }
};

const delChecks = () => {
  listRef.value.delete();
};

const comeBack = () => {
  configType.value = "list";
  showBreadCrumb.value = false;
};

const addCallback = f => {
  comeBack();
  f && listRef.value.refresh();
};

const listChangeHandle = ({ action, data }) => {
  configType.value = action;

  if (action === "upload") {
    navigationTo(function addUploadFile() {
      configType.value = "list";
    });
  } else if (action === "modify") {
    navigationTo(function modifyUploadFile() {
      configType.value = "list";
    });
  }
};
</script>

<style lang="less" scoped></style>
