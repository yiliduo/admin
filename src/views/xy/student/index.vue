<template>
  <div class="student-main">
    <el-card class="search-box" shadow="never">
      <div slot="header">
        <span>搜索条件</span>
      </div>
      <el-form ref="searchForm" :model="searchForm" label-width="80px" size="small">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="名字">
              <el-input v-model="searchForm.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班级">
              <el-select v-model="searchForm.classId" clearable placeholder="请选择">
                <el-option
                  v-for="item in classList"
                  :key="item.id"
                  :label="item.className"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="宿舍">
              <el-select v-model="searchForm.dormId" clearable placeholder="请选择">
                <el-option v-for="item in dormList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="20">
            <el-button size="small" @click="reset">重置</el-button>
            <el-button size="small" type="primary" @click="doSearch">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

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
      <el-table v-loading="loading" :data="studentListstr" border stripe>
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="sexv" label="性别" width="50" />
        <el-table-column prop="classname" label="班级" width="150" />
        <el-table-column prop="cityStr" label="城市" width="200" />
        <el-table-column prop="manID" label="身份证" width="100" />
        <el-table-column prop="tel" label="电话" width="100" />
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑页面 -->
    <Edit ref="edit" :visible="isEdit" :studentss="studentss" :payxtudent="payxtudent" />
  </div>
</template>

<script>
import StudentApi from '@/api/student'
import ClassApi from '@/api/clazz'
import DormApi from '@/api/dorm'
import { resetData } from '@/utils/index'
import { regionDataPlus, CodeToText } from 'element-china-area-data'
import _ from 'lodash'
import Edit from './detail/edit'

export default {
  name: 'Student',
  components: {
    Edit
  },
  data() {
    return {
      isEdit: false,
      loading: true,
      searchForm: {
        name: '',
        classId: '',
        dormId: ''
      },
      studentList: [], // 用户列表
      studentlists: [],
      page: {
        start: 1, // 当前页
        limit: 5, // 每页大小
        totalCount: 0, // 总数
        totalPage: 0 // 总页数
      },
      classList: [],
      dormList: [],
      studentss: {},
      payxtudent: {}
    }
  },
  computed: {
    studentListstr() {
      return this.studentList.map(item => {
        if (item.city) {
          var citys = item.city.split(',')
          var cityStr = citys.reduce((a, b) => {
            a += ',' + CodeToText[b]
            return a
          }, '').substr(1)
          item.cityStr = cityStr
        }
        return item
      })
    }
  },
  created() {
    // 初始化宿舍和班级信息
    this.getClassList()
    this.getDormList()
    this.getStudentList()
    console.log(CodeToText['110000'])
  },
  mounted() {
    // studentList
  },
  methods: {
    doSearch() {
      // 1. 还原page的搜索条件
      // this.$options.data()能获取this.data对象的原始数据
      // console.log('==>',this.$options.data().page);
      // this.page = this.$options.data().page;
      resetData(this, 'page')
      // 2. 添加搜索条件
      this.getStudentList()
    },
    reset() {
      this.searchForm = {}
      this.getClassList()
      this.getDormList()
      this.getStudentList()
    },
    getStudentList() {
      this.loading = true
      // 分页的查询条件
      var {
        start,
        limit
      } = this.page // 解构
      // 搜索的查询条件
      var searchObj = this.searchForm
      // 排除没有值的内容
      searchObj = _.pickBy(this.searchForm, item => item)
      // {
      //   start: start,
      //   limit: limit
      // }
      // 关于提交,必须以
      // xyUser:{
      //   id:xx,
      //   name:xx
      // }  作为参数
      StudentApi.getStudentList({
        start,
        limit,
        ...searchObj
      }).then(res => {
        Object.assign(this.page, {
          limit: res.data.pageSize,
          totalPage: res.data.totalPage,
          totalCount: res.data.totalRow
        })
        this.studentList = res.data.list
        // console.log(res.data.list);
        this.loading = false
      })
    },
    getClassList() {
      ClassApi.getClassList().then(res => {
        this.classList = res.data.list
      })
    },
    getDormList() {
      DormApi.getDormList().then(res => {
        this.dormList = res.data.list
      })
    },
    handleEdit(row) {
      // 			var searchObj = this.searchForm;
      // 			// 排除没有值的内容
      // 			searchObj = _.pickBy(this.searchForm, item => item);
      var ros = row
      // ros = _.pickBy(row, item => item);
      var id = ros.id
      var userId = id
      this.$refs.edit.openDialog()
      StudentApi.detailStudent({
        id
      }).then(res => {
        this.studentss = res.data
        if (res.data.city != null) {
          this.studentss.city = res.data.city.split(',')
        } else {
          this.studentss.city = []
        }
        StudentApi.payStudent({
          userId
        }).then(res => {
          this.payxtudent = res.data
          this.$refs.edit.tableData = res.data
        })
        var that = this
        setTimeout(function() {
          that.$refs.edit.ass()
        }, 20)
      })
    },
    handleDelete(row, id) {
      var r = confirm('确定要删除吗?')
      if (r === true) {
        StudentApi.removeStudent({
          id
        }).then(res => {
          this.getStudentList()
        })
      }
    },
    // 页码大小发生变化触发
    handleSizeChange(val) {
      alert(val)
    },
    // 当前页发生变化触发
    handleCurrentChange(val) {
      // 先改变page对象
      this.page.start = val
      this.getStudentList()
    },
    goAdd() {
      // this.isEdit = true;
      // 调用子组件的方法
      this.$refs.edit.openDialog()
    }
  }
}
</script>

<style lang='scss' scoped>
  .student-main {

    .search-box,
    .table-box {
      margin: 30px 20px;
    }

    .pagination {
      text-align: right;
    }
  }
</style>
