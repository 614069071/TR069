<template>
  <div class="layout-page-view-wrapper">
    <div v-show="configType === 'list'">
      <List ref="list" @change="listChangeHandle" />
    </div>

    <div v-show="configType === 'add'">
      <Create @change="comeBack" />
    </div>

    <div v-show="configType === 'detail'">
      <Detail :data="detailData" />
    </div>
  </div>
</template>

<script setup>
import List from "./components/list.vue";
import Create from "./components/add.vue";
import Detail from "./components/detail.vue";
import { ref } from "vue";

const configType = ref("list");
const detailData = ref({});
const list = ref(null);

const comeBack = () => {
  configType.value = "list";
  list.value.refresh();
};

const listChangeHandle = ({ action, data }) => {
  configType.value = action;
  if (action === "add") {
    navigationTo(function preConfigAddTask() {
      configType.value = "list";
    });
  } else if (action === "detail") {
    detailData.value = data;

    navigationTo(function commonDetail() {
      configType.value = "list";
    });
  }
};
</script>

<style lang="less" scoped></style>
