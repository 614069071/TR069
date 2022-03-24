<template>
  <config-header>创建任务</config-header>

  <a-form layout="vertical" ref="formRef" :model="condition">
    <a-row :gutter="40">
      <a-col :span="8">
        <a-form-item field="manufacturer" label="厂商">
          <a-select v-model="condition.manufacturer" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="deviceType" label="设备类型">
          <a-select v-model="condition.deviceType" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="upgradeFileUrl" label="升级文件">
          <a-select v-model="condition.upgradeFileUrl" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="upgradeRuleId" label="升级规则">
          <a-select v-model="condition.upgradeRuleId" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="autoUpgrade" label="自动升级">
          <a-select v-model="condition.autoUpgrade" placeholder="please enter...">
            <a-option label="自动" value="1"></a-option>
            <a-option label="不自动" value="0"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>

  <div class="create-order-submits" style="margin: 15px 0">
    <a-space>
      <a-button html-type="submit" @click="cancelHandle">取消</a-button>
      <a-button html-type="submit" type="primary" @click="handleBeforeOk">创建</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { createUpgradeTask } from "@/services/api/jin.api";

const emit = defineEmits(["change"]);

let formRef = ref(null);

const condition = reactive({ manufacturer: "", deviceType: "", upgradeFileUrl: "", upgradeRuleId: "", autoUpgrade: "" });

const cancelHandle = () => {
  emit("change");
  formRef.value.resetFields();
};

const handleBeforeOk = () => {
  createUpgradeTask(condition)
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
