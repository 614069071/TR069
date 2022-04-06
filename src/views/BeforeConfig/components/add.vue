<template>
  <div class="layout-page-view-wrapper">
    <ConfigHeader>新增工单</ConfigHeader>

    <a-form layout="vertical" ref="formRef" :model="condition">
      <a-row :gutter="40">
        <a-col :span="8">
          <a-form-item field="deviceType" label="设备唯一标识" required>
            <a-input v-model="condition.deviceType" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="ssidname24G" label="2.4G SSID名称" required>
            <a-input v-model="condition.ssidname24G" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="pppoeUsername" label="PPPOE账号" required>
            <a-input v-model="condition.pppoeUsername" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="sipuser" label="SIP用户信息" required>
            <a-input v-model="condition.sipuser" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="ssidname58G" label="5G SSID名称" required>
            <a-input v-model="condition.ssidname58G" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="pppoePassword" label="PPPOE密码" required>
            <a-input v-model="condition.pppoePassword" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item field="remark" label="备注" required>
            <a-textarea v-model="condition.remark" placeholder="Please enter something" allow-clear />
          </a-form-item>
        </a-col>
      </a-row>

      <ConfigHeader>配置模板</ConfigHeader>

      <a-form-item>
        <a-transfer :title="['备选模板', '已选模板']" :data="defModels" v-model="condition.profilesIdList" />
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button @click="handleCancel">取消</a-button>
          <a-button html-type="submit" type="primary" @click="handleBeforeOk">创建</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, ref, onMounted, defineComponent } from "vue";
import { addPreConfigItem, getAllProfiles } from "@/services/api/jin.api";

export default defineComponent({
  name: "before-config-add",
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const condition = reactive({ deviceType: "", ssidname24G: "", pppoeUsername: "", sipuser: "", ssidname58G: "", pppoePassword: "", remark: "", profilesIdList: [] });
    const defModels = ref([]);

    const handleCancel = () => {
      formRef.value.resetFields();
      router.push("/layout/deviceManagement/beforeConfig");
    };

    const handleBeforeOk = () => {
      addPreConfigItem(condition)
        .then(res => {
          if (res.data.status !== 200) return;

          handleCancel();
        })
        .catch(err => {
          console.log(err);
        });
    };

    onMounted(() => {
      getAllProfiles()
        .then(res => {
          const { status, obj = [] } = res.data;

          if (status !== 200) return;

          defModels.value = obj.map(({ id, profileName }) => ({ label: profileName, value: id }));
        })
        .catch(err => {
          console.log(err);
        });
    });

    return {
      formRef,
      condition,
      defModels,
      handleCancel,
      handleBeforeOk,
    };
  },
});
</script>

<style lang="less" scoped></style>
