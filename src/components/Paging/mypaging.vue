<template>
  <div class="main-paging">
    <el-pagination
      class="pagination"
      :current-page="page.start"
      :page-sizes="page.pageSplit"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Mypaging',
  props: {
    page: Object
  },
  data() {
    return {

    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handle-size-change', val)
    },
    handleCurrentChange(val) {
      this.$emit('handle-current-change', val)
    }
  }
}
</script>

<style>
</style>
