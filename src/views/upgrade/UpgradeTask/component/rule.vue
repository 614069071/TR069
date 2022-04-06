<template>
  <div class="layout-page-view-wrapper">
    <config-header>修改规则</config-header>

    <a-form layout="vertical" ref="formRef" :model="condition">
      <a-row :gutter="40">
        <a-col :span="8">
          <a-form-item label="当前规则">
            <a-select placeholder="please enter...">
              <a-option label="1" value="1"></a-option>
              <a-option label="2" value="2"></a-option>
              <a-option label="3" value="3"></a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="新规则">
            <a-select placeholder="please enter...">
              <a-option label="1" value="1"></a-option>
              <a-option label="2" value="2"></a-option>
              <a-option label="3" value="3"></a-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item>
            <a-space>
              <a-button @click="cancel">取消</a-button>
              <a-button html-type="submit" type="primary" @click="submit">创建</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { modifyUpgradeRule } from "@/services/api/jin.api";

export default defineComponent({
  name: "upgrade-task-rule",
  setup() {
    const router = useRouter();
    const condition = reactive({});
    const formRef = ref(null);

    const cancel = () => {
      formRef.value.resetFields();
      router.push("/layout/upgradeManagement/upgradeTask");
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

    return {
      condition,
      formRef,
      cancel,
      submit,
    };
  },
});
</script>

<style lang="less" scoped></style>
