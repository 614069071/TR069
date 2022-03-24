<template>
  <Wrapper title="升级文件" :breadList="breadList" :showBreadCrumb="showBreadCrumb">
    <template v-slot:operation>
      <a-button type="primary" size="small" @click="controlHandle('upload')">上传文件</a-button>
      <a-button type="primary" size="small" @click="controlHandle('delete')">删除</a-button>
      <a-button type="primary" size="small" @click="filterList">筛选</a-button>
    </template>

    <template v-slot:contentMain>
      <div v-show="configType === 'list'">
        <List @change="listChangeHandle" ref="listRef" v-model="sideVisible" />
      </div>

      <div v-show="configType === 'upload'">
        <Create @change="addCallback" />
      </div>

      <div v-show="configType === 'modify'">
        <Modify @change="comeBack" />
      </div>

      <div v-show="configType === 'rules'">
        <Rules @change="comeBack" />
      </div>
    </template>
  </Wrapper>
</template>

<script setup>
import List from "./components/list.vue";
import Create from "./components/add.vue";
import Modify from "./components/modify.vue";
import Rules from "./components/rules.vue";
import Wrapper from "@/components/wrapper/index.vue";
import { reactive, ref } from "vue";

const showBreadCrumb = ref(false);
const breadList = reactive(["终端管理", "升级管理", "升级文件"]);
const configType = ref("list"); //add delete import detail
const sideVisible = ref(false);
const breads = { upload: "上传文件", modify: "修改" };
const listRef = ref(null);

const controlHandle = type => {
  sideVisible.value = false;
  showBreadCrumb.value = true;
  configType.value = type;

  if (type == "upload") {
    breadList.splice(3, 1, breads[type]);
  } else if (type == "delete") {
  }
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
  const currentBread = breads[action] || action;
  sideVisible.value = false;
  showBreadCrumb.value = true;
  configType.value = action;
  breadList.splice(3, 1, currentBread);
};

const filterList = () => {
  sideVisible.value = true;

  console.log(sideVisible.value);
};
</script>

<style lang="less" scoped></style>
