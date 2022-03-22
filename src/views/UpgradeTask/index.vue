<template>
  <Wrapper title="升级任务" :breadList="breadList" :showBreadCrumb="showBreadCrumb">
    <template v-slot:operation>
      <a-button type="primary" size="small" @click="controlHandle('add')">创建任务</a-button>
      <a-button type="primary" size="small" @click="filterList">筛选</a-button>
    </template>

    <template v-slot:contentMain>
      <div v-show="configType === 'list'">
        <List @change="listChangeHandle" ref="list" />
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
import RightSide from "@/components/rightSidePopUpBox/index.vue";
import { reactive, ref } from "vue";

const showBreadCrumb = ref(false);
const breadList = reactive(["终端管理", "升级管理", "升级任务"]);
const configType = ref("list"); //add delete import detail
const sideVisible = ref(false);
let list = ref(null);

const controlHandle = (type) => {
  sideVisible.value = false;
  showBreadCrumb.value = true;
  configType.value = type;

  if (type == "add") {
    breadList.splice(3, 1, "创建任务");
  }
};

const comeBack = () => {
  configType.value = "list";
  showBreadCrumb.value = false;
};

const breads = { modify: "修改文件", rules: "修改规则" };

const listChangeHandle = ({ action, data }) => {
  const currentBread = breads[action] || action;
  sideVisible.value = false;
  showBreadCrumb.value = true;
  configType.value = action;
  breadList.splice(3, 1, currentBread);
};

const filterList = () => {
  sideVisible.value = true;
};
</script>

<style lang="less" scoped></style>
