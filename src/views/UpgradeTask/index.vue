<template>
  <Wrapper title="升级任务" :breadList="breadList" :showBreadCrumb="showBreadCrumb">
    <template v-slot:operation>
      <a-button type="primary" size="small" @click="controlHandle('add')">创建任务</a-button>
      <a-button type="primary" size="small" @click="filterList">筛选</a-button>
    </template>

    <template v-slot:contentMain>
      <div v-show="configType === 'list'">
        <List @change="listChangeHandle" />
      </div>

      <div v-show="configType === 'add'">
        <Create @change="createOrderHandle" />
      </div>

      <div v-show="configType === 'modify'">
        <Modify @change="createOrderHandle" />
      </div>

      <div v-show="configType === 'rules'">
        <Rules @change="createOrderHandle" />
      </div>

      <RightSide rightBoxTitle="筛选" :showRightBox="sideVisible" @closePops="(v) => (sideVisible = v)">
        <template v-slot:rightSidePopUpWindow>
          <a-form layout="vertical" :model="form">
            <a-form-item label="目标版本">
              <a-input v-model="form.value1" placeholder="please enter..." />
            </a-form-item>
            <a-form-item label="OUI">
              <a-input v-model="form.value1" placeholder="please enter..." />
            </a-form-item>
            <a-form-item label="设备类型">
              <a-input v-model="form.value1" placeholder="please enter..." />
            </a-form-item>
            <a-form-item label="状态">
              <a-select v-model="form.value1" placeholder="please enter...">
                <a-option label="1" value="1"></a-option>
                <a-option label="2" value="2"></a-option>
                <a-option label="3" value="3"></a-option>
              </a-select>
            </a-form-item>
          </a-form>
        </template>
      </RightSide>
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
const form = reactive({});

const controlHandle = (type) => {
  sideVisible.value = false;
  showBreadCrumb.value = true;
  configType.value = type;

  if (type == "add") {
    breadList.splice(3, 1, "创建任务");
  }
};

const createOrderHandle = () => {
  configType.value = "list";
  showBreadCrumb.value = false;
};

const listChangeHandle = ({ action, data }) => {
  sideVisible.value = false;
  showBreadCrumb.value = true;
  configType.value = action;

  if (action == "modify") {
    breadList.splice(3, 1, "修改文件");
  } else if (action == "rules") {
    breadList.splice(3, 1, "修改规则");
  } else {
  }
};

const filterList = () => {
  sideVisible.value = true;
};
</script>

<style lang="less" scoped></style>
