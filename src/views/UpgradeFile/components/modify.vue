<template>
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
            <NavButton :onClick="cancel">取消</NavButton>
            <a-button html-type="submit" type="primary" @click="submit">创建</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup>
import { upgradeTask } from "@/services/api/jin.api";
import { reactive, ref, toRefs } from "vue";

const _props = defineProps({
  data: {
    type: Object,
    default: () => ({ currnet: {}, list: [] }),
  },
});

const { data } = toRefs(_props);

const emit = defineEmits(["change"]);

let formRef = ref(null);
const condition = reactive({ newid: "" });

const cancel = () => {
  emit("change");
  formRef.value.resetFields();
};

const submit = async () => {
  const isPass = !(await formRef.value.validate());
  const params = { old: data.value.current.upgradeFileId, new: condition.newid };

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
</script>

<style lang="less" scoped></style>
