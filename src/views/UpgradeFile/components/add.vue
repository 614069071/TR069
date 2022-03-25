<template>
  <config-header>上传文件</config-header>

  <a-form layout="vertical" ref="formRef" :model="condition">
    <a-row :gutter="40">
      <a-col :span="8">
        <a-form-item field="ouiName" label="厂商OUI" required>
          <a-select v-model="condition.ouiName" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="deviceType" label="设备类型" required>
          <a-select v-model="condition.deviceType" placeholder="please enter...">
            <a-option label="1" value="1"></a-option>
            <a-option label="2" value="2"></a-option>
            <a-option label="3" value="3"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="file" label="文件" :rules="[{ required: true, message: '请选择文件 （仅支持 .bin .img .tag 格式文件）' }]">
          <label for="upload_file" class="def-im-form-item">
            <input id="upload_file" ref="uploadRef" accept=".bin,.img,.tag" type="file" style="display: none" @change="uploadFile" />{{ uploadHodel }}<icon-right />
          </label>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="status" label="状态">
          <a-select v-model="condition.status" placeholder="please enter...">
            <a-option label="禁用" value="0"></a-option>
            <a-option label="启用" value="1"></a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="16">
        <a-form-item field="remark" label="备注">
          <a-textarea allow-clear auto-size v-model="condition.remark" placeholder="Please enter something" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item>
      <a-space>
        <a-button @click="cancelHandle">取消</a-button>
        <a-button html-type="submit" type="primary" @click="handleBeforeOk">创建</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { IconRight } from "@arco-design/web-vue/es/icon";
import { uploadUpgradeFile } from "@/services/api/jin.api";
import { makeMap } from "@/utils/jin.utils";

const emit = defineEmits(["change"]);

const formRef = ref(null);
const uploadRef = ref(null);
const condition = reactive({ status: "", deviceType: "", ouiName: "", remark: "", file: null });
const uploadHodel = ref("请选择");

const cancelHandle = f => {
  emit("change", f);
  formRef.value.resetFields();
};

const handleBeforeOk = async () => {
  const isPass = await formRef.value.validate();

  if (isPass) return;

  const fd = new FormData();
  const conditionToArg = Object.entries(condition);

  conditionToArg.forEach(([k, v]) => fd.append(k, v));

  uploadUpgradeFile(fd)
    .then(({ data: { status } }) => {
      if (status !== 200) return;

      emit("change", true);
    })
    .catch(err => {
      console.log(err);
    });
};

const supportFormats = ["bin", "tag", "img"];
const mapSuppors = makeMap(supportFormats);

const uploadFile = e => {
  const [file] = e.target.files;

  if (!file) return;

  const { name } = file;
  const suffix = name.split(".").pop();
  const isSupport = mapSuppors(suffix);

  if (isSupport) {
    uploadHodel.value = name;
    condition.file = file;
  } else {
    uploadRef.value = null;
  }
};
</script>

<style lang="less" scoped></style>
