<template>
  <div class="layout-page-view-wrapper">
    <ConfigHeader>详情</ConfigHeader>

    <div class="pre-config-detail-table-wrapper">
      <div class="table-title">设备唯一标识</div>
      <div class="table-content">{{ data.deviceType }}</div>
      <div class="table-title">2.4G SSID名称</div>
      <div class="table-content">{{ data.ssidname24G }}</div>
      <div class="table-title">5G SSID名称</div>
      <div class="table-content">{{ data.ssidname58G }}</div>
      <div class="table-title">PPPOE账号</div>
      <div class="table-content">{{ data.pppoeUsername }}</div>
      <div class="table-title">PPPOE密码</div>
      <div class="table-content col-1">{{ data.pppoePassword }}</div>
      <div class="table-title">SIP用户信息</div>
      <div class="table-content col-2">{{ data.sipuser }}</div>
      <div class="table-title sp">备注</div>
      <div class="table-content col-2 sp">{{ data.remark }}</div>
      <div class="table-title sp">配置模板</div>
      <div class="table-content col-2 sp">{{ mapProfilsName }}</div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "before-config-detail",
  setup() {
    const _data = sessionStorage.getItem("_pre_config_item_");
    const data = ref(JSON.parse(_data) || {});
    const mapProfilsName = computed(() => {
      const names = (data.value.profiles || []).map(({ profileName }) => profileName);
      return names.join(", ");
    });

    return {
      data,
      mapProfilsName,
    };
  },
});
</script>

<style scoped lang="less">
.pre-config-detail-table-wrapper {
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid #e5e6eb;
  border-top: 1px solid #e5e6eb;

  .table-title,
  .table-content {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e5e6eb;
    border-right: 1px solid #e5e6eb;
  }

  .table-title {
    background-color: #f7f8fa;
    width: 13.33%;
    color: #86909c;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table-content {
    width: 20%;
    box-sizing: border-box;
    padding: 0 20px;
  }

  .col-1 {
    width: 53.33%;
  }

  .col-2 {
    width: 86.66%;
  }

  .sp {
    height: 100px;
  }
}
</style>
