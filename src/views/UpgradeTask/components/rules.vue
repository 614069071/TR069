<template>
  <config-header>修改规则</config-header>

  <a-form layout="vertical" :model="condition">
    <a-row :gutter="40" ref="formRef">
      <a-col :span="8">
        <a-form-item label="当前规则">
          <a-select v-model="condition.value1" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="新规则">
          <a-select v-model="condition.value1" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item>
          <a-space>
            <a-button html-type="cancel" @click="cancel">取消</a-button>
            <a-button html-type="submit" type="primary" @click="submit">创建</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { modifyUpgradeRule } from "@/services/api/jin.api";

const emit = defineEmits(["change"]);

const condition = reactive({});

let formRef = ref(null);

const cancel = () => {
  emit("change");
  formRef.value.resetFields();
};

const submit = () => {
  modifyUpgradeRule(condition)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
</script>

<style lang="less" scoped></style>
