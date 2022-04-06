<template>
  <SelfTable :paginationData="tableNums" @changePage="handlePage" @changeSize="handleSize">
    <template v-slot:table>
      <a-table :data="tableData" class="table-content" :pagination="false">
        <template #columns>
          <a-table-column title="序号" data-index="index"></a-table-column>
          <a-table-column title="权限集名称" data-index="permissionName"></a-table-column>
          <a-table-column title="创建人" data-index="createBy"></a-table-column>
          <a-table-column title="操作" class="operation">
            <template #cell="{ record }">
              <div class="revise" @click="showModify(record)" v-show="record.createBy != 'superadmin'">修改</div>
              <div class="resource" @click="showResource(record)" v-show="record.createBy != 'superadmin'">可访问资源</div>
              <div class="delete" @click="showDelete(record)" v-show="record.createBy != 'superadmin'">删除</div>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </template>
  </SelfTable>
</template>

<script>
import { ref, toRefs } from "vue";
import { useAppStore, useNavigationStore } from "@/store";
import { Modal } from "@arco-design/web-vue";
import { deletePermission } from "@/services/api/system-settings";
import SelfTable from "@/components/self-table/index.vue";
import { jumpTo } from "@/utils/common";
export default {
  components: {
    SelfTable,
  },
  props: {
    tableData: {
      type: Array,
      default() {
        [];
      },
    },
    tableNums: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    let { tableData, tableNums } = toRefs(props);
    const appStore = useAppStore();
    const navigationStore = useNavigationStore();
    const paginationData = ref(0);
    const showModify = record => {
      const row = {
        operation: "modify",
        ...record,
      };
      appStore.updateSettings({ permissionsModifyRow: row });
      jumpTo("/layout/setting/permission/modify");
      return;
      context.emit("modify");
      navigationStore.updateChild("修改");
    };
    const showResource = record => {
      appStore.updateShowRightBox(true);
      appStore.updatePermissionsRow(record);
    };
    const showDelete = record => {
      let pid = record.permissionId;
      Modal.warning({
        title: "删除",
        content: "请确定是否要删除",
        onOk: () => {
          deletePermission(pid).then(res => {
            if (res.data.status == 200) {
              context.emit("deleteSuccess");
            }
          });
        },
      });
    };
    const handlePage = current => {
      context.emit("changePage", current);
    };
    const handleSize = pageSize => {
      context.emit("changeSize1", pageSize);
    };

    return {
      tableData,
      showModify,
      showResource,
      showDelete,
      handlePage,
      handleSize,
      paginationData,
      tableNums,
    };
  },
};
</script>

<style lang="less" scoped>
.table-wrapper {
  :deep(.table-content) {
    tbody {
      .arco-table-tr {
        .arco-table-td {
          &:nth-last-of-type(1) {
            .arco-table-cell {
              display: flex;
              .revise,
              .resource {
                color: #165dff;
                height: 22px;
                line-height: 22px;
                position: relative;
                padding-right: 12px;
                cursor: pointer;
              }
              .resource {
                padding-left: 12px;
              }
              .delete {
                color: #f53f3f;
                height: 22px;
                line-height: 22px;
                position: relative;
                padding-left: 12px;
                cursor: pointer;
              }
              .resource::before,
              .delete::before {
                content: "";
                display: block;
                width: 1px;
                height: 50%;
                background: #c4c4c4;
                position: absolute;
                left: 0px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
    }
  }
}
</style>
