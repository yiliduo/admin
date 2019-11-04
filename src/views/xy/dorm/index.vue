<template>
  <div class="dorm-mian">
    <el-card class="table-box">
      <div slot="header">
        <el-row>
          <el-col :span="4">
            <el-button type="primary" @click="goAdd">添加</el-button>
          </el-col>
          <el-col :span="20">
            <el-pagination
              class="pagination"
              :current-page="page.start"
              :page-sizes="[5,10,15]"
              :page-size="page.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.totalCount"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-col>
        </el-row>
      </div>
      <el-table :data="dormList" border stripe style="width: 100%">
        <el-table-column prop="name" label="宿舍名称" width="180" />
        <el-table-column prop="type" label="类型" width="180">
          <template slot-scope="scope">
            {{ scope.row.type == "0"? "男生宿舍":"女生宿舍" }}
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="180" />
        <el-table-column prop="endTime" label="结束时间" width="180" />
        <el-table-column prop="bak" label="班级描述" />
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Dorms ref="dorms" :dormdent="dormdent" />
  </div>
</template>

<script>
import DormApi from '@/api/dorm.js'
import { resetData } from '@/utils/index'
import Dorms from './adddorm/dorm'
import _ from 'lodash'
export default {
  name: 'Dorm',
  components: {
    Dorms
  },
  data() {
    return {
      page: {
        start: 1, // 当前页
        limit: 5, // 每页大小
        totalCount: 0, // 总数
        totalPage: 0 // 总页数
      },
      dormList: [],
      dormdent: {}
    }
  },
  created() {
    this.getdormList()
  },
  methods: {
    getdormList() {
      this.loading = true
      var searchObj = this.searchForms

				 searchObj = _.pickBy(this.searchForms, item => item)

      var {
        start,
        limit
      } = this.page
      DormApi.getDormList({
        start,
        limit
      }).then(res => {
        Object.assign(this.page, {
          limit: res.data.pageSize,
          totalPage: res.data.totalPage,
          totalCount: res.data.totalRow
        })
        this.loading = false
        this.dormList = res.data.list
      })
    },
    goAdd() {
      this.$refs.dorms.openDialog()
    },
    handleSizeChange() {

    },
    handleCurrentChange(val) {
      this.page.start = val
      this.getdormList()
    },
    handleEdit(row) {
      var id = row.id
      this.$refs.dorms.openDialog()
      DormApi.detailDormList({
        id
      }).then(res => {
        this.dormdent = res.data
        var that = this
        setTimeout(function() {
          that.$refs.dorms.acc()
        }, 20)
      })
    },
    handleDelete(row, id) {
      var r = confirm('确定要删除吗?')
      if (r == true) {
        DormApi.removeDormList({
          id
        }).then(res => {
          this.getdormList()
        })
      }
    }
  }
}
</script>

<style>
</style>
