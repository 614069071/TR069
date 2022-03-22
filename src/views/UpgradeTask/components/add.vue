<template>
  <config-header>创建任务</config-header>

  <a-form layout="vertical" :model="form">
    <a-row :gutter="40">
      <a-col :span="8">
        <a-form-item label="厂商">
          <a-select v-model="form.value1" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="设备类型">
          <a-select v-model="form.deviceType" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="升级文件">
          <a-select v-model="form.value1" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="升级规则">
          <a-select v-model="form.value1" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="自动升级">
          <a-select v-model="form.autoUpgrade" placeholder="please enter...">
            <a-option label="自动" value="1"></a-option>
            <a-option label="不自动" value="0"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>

  <div class="create-order-submits" style="margin: 15px 0">
    <a-space>
      <a-button html-type="submit" @click="emit('change')">取消</a-button>
      <a-button html-type="submit" type="primary" @click="handleBeforeOk">创建</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { createUpgradeTask } from "@/services/api/jin.api";

const emit = defineEmits(["change"]);

const form = reactive({});

const handleBeforeOk = () => {
  createUpgradeTask(form)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const configModel = reactive([
  { value: 1, label: "1" },
  { value: 2, label: "2" },
]);

const configDef = reactive([]);
</script>

<style lang="less" scoped></style>
