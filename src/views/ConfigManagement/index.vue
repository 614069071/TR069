<template>
  <ConfigContainer>
    <ConfigHeader>TR069 ACS配置</ConfigHeader>

    <a-form layout="vertical" :model="formDataAcs">
      <a-row :gutter="40">
        <a-col :span="8">
          <a-form-item label="URL地址">
            <a-input v-model="formDataAcs.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="使用者名称">
            <a-input v-model="formDataAcs.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="密码">
            <a-input v-model="formDataAcs.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item>
            <a-space>
              <a-button html-type="submit" type="primary">保存设置</a-button>
              <a-button html-type="submit" type="primary">更新到已发现设备</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </ConfigContainer>

  <div class="def-space"></div>

  <ConfigContainer>
    <ConfigHeader>CPE连接认证默认配置</ConfigHeader>

    <a-form layout="vertical" :model="formDataCpe">
      <a-row :gutter="40">
        <a-col :span="8">
          <a-form-item label="连接请求用户名">
            <a-input v-model="formDataCpe.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="连接请求密码">
            <a-input v-model="formDataCpe.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="路径">
            <a-input v-model="formDataCpe.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="端口">
            <a-input v-model="formDataCpe.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item>
            <a-space>
              <a-button html-type="submit" type="primary">保存设置</a-button>
              <a-button html-type="submit" type="primary">更新到已发现设备</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </ConfigContainer>

  <div class="def-space"></div>

  <ConfigContainer>
    <ConfigHeader>STUN参数配置</ConfigHeader>

    <a-form layout="vertical" :model="formDataStun">
      <a-row :gutter="40">
        <a-col :span="8">
          <a-form-item label="URL地址">
            <a-select v-model="formDataStun.username" placeholder="please enter...">
              <a-option value="1" label="1" />
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="STUN服务器地址">
            <a-input v-model="formDataStun.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="STUN服务器端口">
            <a-input v-model="formDataStun.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item>
            <a-space>
              <a-button html-type="submit" type="primary">保存设置</a-button>
              <a-button html-type="submit" type="primary">更新到已发现设备</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </ConfigContainer>

  <div class="def-space"></div>

  <ConfigContainer>
    <ConfigHeader>CPE管理配置</ConfigHeader>

    <a-form layout="vertical" :model="formDataCpem">
      <a-row :gutter="40">
        <a-col :span="8">
          <a-form-item label="定期通知">
            <a-select v-model="formDataCpem.username" placeholder="please enter...">
              <a-option value="1" label="1" />
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="定期通知间隔(秒)">
            <a-input v-model="formDataCpem.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="数据保留天数">
            <a-input v-model="formDataCpem.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="备份周期(小时)">
            <a-input v-model="formDataCpem.username" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="备份日志">
            <a-select v-model="formDataCpem.username" placeholder="please enter...">
              <a-option value="1" label="1" />
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="备份配置">
            <a-select v-model="formDataCpem.username" placeholder="please enter...">
              <a-option value="1" label="1" />
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="备份CWMP数据">
            <a-select v-model="formDataCpem.username" placeholder="please enter...">
              <a-option value="1" label="1" />
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item>
            <a-button html-type="submit" type="primary">保存设置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </ConfigContainer>
</template>

<script setup>
import ConfigHeader from "@/components/ConfigHeader/index.vue";
import ConfigContainer from "@/components/ConfigContainer/index.vue";
import { reactive } from "@vue/reactivity";
const formDataAcs = reactive({});
const formDataCpe = reactive({});
const formDataStun = reactive({});
const formDataCpem = reactive({});
</script>

<style scoped lang="less"></style>
