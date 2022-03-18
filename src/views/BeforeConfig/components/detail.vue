<template>
  <ConfigHeader>详情</ConfigHeader>

  <div class="pre-config-detail-table-wrapper">
    <div class="table-title">设备唯一标识</div>
    <div class="table-content">admin</div>
    <div class="table-title">2.4G SSID名称</div>
    <div class="table-content">1234567</div>
    <div class="table-title">5G SSID名称</div>
    <div class="table-content">1234567</div>
    <div class="table-title">PPPOE账号</div>
    <div class="table-content">1234567</div>
    <div class="table-title">PPPOE密码</div>
    <div class="table-content col-1">1234567</div>
    <div class="table-title">SIP用户信息</div>
    <div class="table-content col-2">1234567</div>
    <div class="table-title sp">备注</div>
    <div class="table-content col-2 sp">1234567</div>
    <div class="table-title sp">配置模板</div>
    <div class="table-content col-2 sp">1234567</div>
  </div>
</template>

<script setup>
import ConfigHeader from "@/components/ConfigHeader/index.vue";
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
