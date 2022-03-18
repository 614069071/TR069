<template>
  <ConfigHeader>新增工单</ConfigHeader>

  <a-form layout="vertical" :model="form">
    <a-row :gutter="40">
      <a-col :span="8">
        <a-form-item label="设备唯一标识" required>
          <a-input v-model="form.username" placeholder="please enter..." />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="2.4G SSID名称" required>
          <a-input v-model="form.sessionTimeout" placeholder="please enter..." />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="PPPOE账号" required>
          <a-input v-model="form.expiredTime" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="SIP用户信息" required>
          <a-input v-model="form.email" placeholder="please enter..." />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="5G SSID名称" required>
          <a-input v-model="form.email" placeholder="please enter..." />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="PPPOE密码" required>
          <a-input v-model="form.phone" placeholder="please enter..." />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="备注" required>
          <a-textarea v-model="form.description" placeholder="Please enter something" allow-clear />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>

  <ConfigHeader>配置模板</ConfigHeader>

  <div class="form-transfer-wapper">
    <a-transfer :title="['备选模板', '已选模板']" :data="configModel" :default-value="configDef" />
  </div>

  <div class="create-order-submits" style="margin: 15px 0">
    <a-space>
      <a-button html-type="submit" @click="handleCancel">取消</a-button>
      <a-button html-type="submit" type="primary" @click="handleBeforeOk">创建</a-button>
    </a-space>
  </div>
</template>

<script setup>
import ConfigHeader from "@/components/ConfigHeader/index.vue";
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
