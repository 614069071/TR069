<template>
  <div class="layout-page-view-wrapper">
    <div v-show="configType === 'list'">
      <List v-show="configType === 'list'" @change="listChangeHandle" />
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
  </div>
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

const comeBack = () => {
  configType.value = "list";
  showBreadCrumb.value = false;
};

const listChangeHandle = ({ action, data }) => {
  configType.value = action;

  if (action === "add") {
    navigationTo(function addTask() {
      configType.value = "list";
    });
  } else if (action === "modify") {
    navigationTo(function modifyTask() {
      configType.value = "list";
    });
  } else if (action === "rules") {
    navigationTo(function rulesTask() {
      configType.value = "list";
    });
  }
};
</script>

<style lang="less" scoped></style>
