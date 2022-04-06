<template>
  <div class="layout-page-view-wrapper">
    <config-header>修改文件</config-header>

    <a-form layout="vertical" ref="formRef" :model="condition">
      <a-row :gutter="40">
        <a-col :span="8">
          <a-form-item label="当前文件">
            <div class="def-im-form-item">{{ (data.current || {}).upgradeFileName }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="newid" label="新文件" required>
            <a-select v-model="condition.newid" placeholder="please enter...">
              <a-option :label="upgradeFileName" :value="upgradeFileId" v-for="{ upgradeFileName, upgradeFileId } in data.list"></a-option>
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
import { upgradeTask } from "@/services/api/jin.api";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "upgrade-file-mpdify",
  setup() {
    const _data = sessionStorage.getItem("_upgrade_file_modify_") || {};
    const data = reactive(JSON.parse(_data));

    console.log("_data", data);
    let formRef = ref(null);
    const condition = reactive({ newid: "" });
    const router = useRouter();

    const cancel = () => {
      formRef.value.resetFields();
      router.push("/layout/upgradeManagement/upgradeFile");
    };

    const submit = async () => {
      const isPass = !(await formRef.value.validate());
      const params = { old: data.upgradeFileId, new: condition.newid };

      if (!isPass || params.old === params.new) return;

      console.log("params", params);

      return;

      upgradeTask(params)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };

    return {
      data,
      formRef,
      condition,
      cancel,
      submit,
    };
  },
});
</script>

<style lang="less" scoped></style>
