<template>
  <div class="asasdads">
    <div>
      <a-table :data="data" :scroll="{ y: 650 }" :pagination="false" :row-selection="rowSelection">
        <template #columns>
          <a-table-column title="序号" width="60" data-index="index"></a-table-column>
          <a-table-column title="平台名称" data-index="platformName"></a-table-column>
          <a-table-column title="平台识别码" data-index="identificationCode"></a-table-column>
          <a-table-column title="客户编码" data-index="platformCode"></a-table-column>
          <a-table-column title="设备数量（在线数/总数）">
            <template #cell="{ record }">
              <span>{{ record.userOnline }}/{{ record.userTotal }}</span>
            </template>
          </a-table-column>
          <a-table-column title="用户数量（在线数/总数）">
            <template #cell="{ record }">
              <span>{{ record.userOnline }}/{{ record.userTotal }}</span>
            </template>
          </a-table-column>
          <a-table-column title="描述" data-index="description"></a-table-column>
          <a-table-column title="启用">
            <template #cell="{ record }">
              <span>{{ record.enable == 1 ? "是" : "否" }}</span>
            </template>
          </a-table-column>
          <a-table-column title="操作" width="330">
            <template #cell="{ record }">
              <span @click="handleClick(record)" class="dalst bod">修改</span>
              <span @click="handleDetail(record)" class="dalst bod">详情</span>
              <span @click="changePassword(record)" class="dalst bod">远程跳转</span>
              <span class="dalst col" @click="handleDelete(record)">删除</span>
            </template>
          </a-table-column>
        </template>
      </a-table>

      <a-modal v-model="visible" @cancel="handleCancel" @before-ok="handleBeforeOk">
        <template #title> 修改密码 </template>
        <a-input v-model="username" type="password" placeholder="please enter..." />
      </a-modal>
    </div>
  </div>
</template>
<script>
import { platformManagement } from "@/services/api/system-settings";
import Pagination from "@/components/pagination/index.vue";
import { Modal } from "@arco-design/web-vue";
import RightSide from "@/components/rightSidePopUpBox/index.vue";
export default {
  props: {
    drawerVisible: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Pagination,
    RightSide,
  },

  data() {
    return {
      form: {},
      current: 1,
      pageSize: 15,
      roleList: [],
      paginationData: null,
      data: null,
      visible: false,
      rowSelection: {
        type: "checkbox",
        showCheckedAll: true,
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(form) {
      let params = {
        page: this.current,
        size: this.pageSize,
        platformName: form ? form.platformName : "",
        enable: form ? form.enable : "",
      };

      const dataInfo = await platformManagement.getPlatform(params);
      dataInfo.data.forEach((element, index) => {
        element.index = index + 1;
        this.roleList.forEach(data => {
          if (element.roleId == data.roleId) {
            element.roleNameZh = data.roleNameZh;
          }
        });
      });
      this.data = dataInfo.data;
      this.paginationData = dataInfo.total;
    },
    changeEnabled(record) {
      let event;
      if (record.enable === 3 || record.enable === 4) {
        event = 0;
      } else {
        event = 1;
      }
      let params = {
        userId: record.userId,
        username: record.username,
        enable: event,
      };
      platformManagement.putUserStatus(params).then(data => {
        this.getData();
      });
    },
    handleClick(record) {
      this.$emit("showBread", record);
      this.title = "修改";
      this.form = JSON.parse(JSON.stringify(record));
    },
    handleDetail(record) {
      this.title = "详情";
      this.$emit("showBread", record, true);
    },
    changePassword() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleBeforeOk() {
      this.visible = false;
    },
    handleDelete(record) {
      let params = record.platformId;
      Modal.warning({
        title: "删除",
        content: "是否删除",
        hideCancel: false,
        onOk: async () => {
          await platformManagement.deletePlatform(params);
          this.getData();
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.addData {
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .bz {
    color: red;
  }
  .box3 {
    width: 30%;
  }
  .box6 {
    width: 65%;
  }
}
.submits {
  margin-top: 20px;
  width: 30%;
  .arco-btn-size-medium {
    width: 30%;
    margin-left: 20px;
  }
}
.addHeader {
  padding: 20px 0 20px 20px;
  font-weight: 600;
}
.dalst {
  padding: 0 10px;
  cursor: pointer;
}
.bod {
  border-right: 1px solid #e5e6e8;
  color: #165dff;
}
.col {
  color: red;
}
</style>
