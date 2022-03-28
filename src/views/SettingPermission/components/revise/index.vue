<template>
  <OperationWrapper :title="'修改'">
    <template v-slot:formContent>
      <a-form :model="form" layout="vertical">
        <a-form-item field="name" label="权限集名称" required>
          <a-input v-model="form.name" placeholder="请输入" />
        </a-form-item>
        <a-form-item>
          <a-button size="large" @click="cancel">取消</a-button>
          <a-button size="large" type="primary" @click="confirmRevise">确认</a-button>
        </a-form-item>
      </a-form>
    </template>
  </OperationWrapper>
</template>

<script>
import { ref, reactive, computed, watch } from "vue";
import OperationWrapper from "@/components/operation-wrapper/index.vue";
import { revisePermission } from "@/services/api/system-settings";
import { useAppStore } from "@/store";
import { hideBreadcrumb } from "@/utils/common";
export default {
  components: {
    OperationWrapper,
  },
  setup(props, context) {
    const appStore = useAppStore();
    const form = reactive({
      name: "",
    });

    const cancel = () => {
      hideBreadcrumb();
    };

    // form.name = computed(() => appStore.permissionsModifyRow.permissionName)

    watch(
      () => appStore.permissionsModifyRow,
      newVal => {
        form.name = newVal.permissionName;
      },
      {
        immediate: true,
        deep: true,
      }
    );

    const confirmRevise = () => {
      let pid = appStore.permissionsModifyRow.permissionId;
      revisePermission(pid, form.name).then(res => {
        if (res.data.status == 200) {
          context.emit("reviseSuccess");
          hideBreadcrumb();
        }
      });
    };

    return {
      cancel,
      confirmRevise,
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
