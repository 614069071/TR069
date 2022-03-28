<template>
  <OperationWrapper :title="'添加权限集'">
    <template v-slot:formContent>
      <a-form :model="form" layout="vertical">
        <a-form-item field="name" label="权限集名称" required>
          <a-input v-model="form.name" placeholder="请输入" />
        </a-form-item>
        <a-form-item>
          <a-button size="large" @click="cancel">取消</a-button>
          <a-button size="large" type="primary" @click="confirmAdd">确认</a-button>
        </a-form-item>
      </a-form>
    </template>
  </OperationWrapper>
</template>

<script>
import { reactive } from "vue";
import OperationWrapper from "@/components/operation-wrapper/index.vue";
import { addPermission } from "@/services/api/system-settings";
import { hideBreadcrumb } from "@/utils/common";
export default {
  components: {
    OperationWrapper,
  },
  setup(props, context) {
    const form = reactive({
      name: "",
    });

    const cancel = () => {
      hideBreadcrumb();
    };

    const confirmAdd = () => {
      addPermission(form.name).then(res => {
        if (res.data.status == 200) {
          context.emit("addSuccess");
          hideBreadcrumb();
        }
      });
    };

    return {
      cancel,
      confirmAdd,
      form,
    };
  },
};
</script>

<style lang="less" scoped>
:deep(.form-content) {
  .arco-form {
    width: 360px;
    .arco-btn {
      margin-right: 12px;
    }
  }
}
</style>
