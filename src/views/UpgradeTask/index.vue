<template>
  <Wrapper title="升级任务" :breadList="breadList" :showBreadCrumb="showBreadCrumb">
    <template v-slot:operation>
      <NavButton type="primary" size="small" :onClick="controlHandle">创建任务</NavButton>
      <a-button type="primary" size="small" @click="filterList">筛选</a-button>
    </template>

    <template v-slot:contentMain>
      <div v-show="configType === 'list'">
        <List @change="listChangeHandle" v-model="sideVisible" />
      </div>

      <div v-show="configType === 'add'">
        <Create @change="comeBack" />
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
import NavButton from "@/components/nav/nav-button.vue";

const showBreadCrumb = ref(false);
const breadList = reactive(["终端管理", "升级管理", "升级任务"]);
const configType = ref("list"); //add delete import detail
const sideVisible = ref(false);
const breads = { modify: "修改文件", rules: "修改规则", add: "创建任务" };

const controlHandle = () => {
  sideVisible.value = false;
  showBreadCrumb.value = true;
  configType.value = "add";

  return function createTask() {
    comeBack();
  };
};

const comeBack = () => {
  configType.value = "list";
  showBreadCrumb.value = false;
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
