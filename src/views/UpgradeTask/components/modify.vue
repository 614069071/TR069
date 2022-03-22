<template>
  <config-header>修改文件</config-header>

  <a-form layout="vertical" :model="form">
    <a-row :gutter="40">
      <a-col :span="8">
        <a-form-item label="当前文件">
          <a-select v-model="form.value1" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="新文件">
          <a-select v-model="form.value1" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item>
          <a-space>
            <a-button html-type="submit" @click="handleCancel">取消</a-button>
            <a-button html-type="submit" type="primary" @click="handleBeforeOk">创建</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["change"]);

const form = reactive({});

const handleCancel = () => {
  emit("change");
};
const handleBeforeOk = () => {};

const configModel = reactive([
  { value: 1, label: "1" },
  { value: 2, label: "2" },
]);

const configDef = reactive([]);
</script>

<style lang="less" scoped></style>
