<template>
  <div class="paginations">
    <a-space direction="vertical"
             size="large">
      <a-pagination size="Small"
                    :total="total"
                    :current="current "
                    :page-size="pageSize"
                    :page-size-options="pageOptions"
                    show-total
                    show-jumper
                    show-page-size
                    @change="changePage"
                    @page-size-change="changeSize" />
    </a-space>
  </div>
</template>
<script>
import { toRefs } from 'vue'
export default {
  setup(props) {
    let contentProps = toRefs(props)
    let total = contentProps.paginationData
    return {
      total
    }
  },
  data() {
    return {
      current: 1,
      pageSize: 15,
      pageOptions: [5, 15, 25, 50]
    }
  },
  props: {
    paginationData: {
      type: Number
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
      this.current = page
    },
    changeSize(size) {
      this.$emit('changeSize', size)
      this.pageSize = size
    }
  }
}
</script>
<style lang="less" scoped>
.paginations {
  margin-top: 30px;
  display: flex;
  justify-content: right;
}
</style>