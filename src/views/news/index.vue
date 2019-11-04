<template>
  <div class="news-main">
<!--    <quill-editor-->
<!--      ref="quilledit"-->
<!--      class="quill"-->
<!--      :content="content"-->
<!--      :options="editorOption"-->
<!--      @change="onEditorChange($event)"-->
<!--    />-->

    <el-card class="search-box" shadow="never">
      <div slot="header">
        <span>搜索条件</span>
      </div>
      <el-form ref="searchForm" :model="searchForm" label-width="80px" size="small">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="标题">
              <el-input v-model="searchForm.title" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者">
              <el-input v-model="searchForm.author" />
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
            <Mypaging :page="page" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" />
          </el-col>
        </el-row>
      </div>
      <el-table :data="newsList" border stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="author" label="作者" width="180" />
        <el-table-column prop="addTime" label="添加时间" width="180" />
        <el-table-column prop="desc" label="描述" width="180" />
        <el-table-column prop="cover" label="封面" width="180">
          <template slot-scope="scope">
            <!-- 'http://59.110.138.169/' -->
            <img class="imgs" :src="scope.row.cover" alt="未加载到">
          </template>
        </el-table-column>
        <el-table-column prop="hot" label="原创" width="50">
          <template slot-scope="scope">
            {{ scope.row.hot == 0? "是":"不是" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Newz ref="edit" />
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import NewsApi from '@/api/news.js'
import { resetData } from '@/utils/index'
import _ from 'lodash'
import Mypaging from '@/components/Paging/mypaging.vue'
import paginationMiXin from '@/mixin/pagination.js'
import Newz from './addnews/news'
export default {
  name: 'News',
  components: {
    quillEditor,
    Mypaging,
    Newz
  },
  mixins: [paginationMiXin],
  data() {
    return {
      content: '吃了吗',
      editorOption: {},
      quill: '',
      newsList: [],
      loading: true,
      searchForm: {
        title: '',
        author: ''
      },
      page: {
        limit: 10,
        pageSplit: [10, 20, 30],
        totalPage: 0,
        totalCount: 0
      }
    }
  },
  mounted() {
    console.log(this.$refs)
    this.quill = this.$refs.quilledit.quill
    this.quill.getModule('toolbar').addHandler('image', this.imageHandler)
  },
  created() {
    this.getnewsList()
  },
  methods: {
    getnewsList() {
      this.loading = true
      var searchObj = this.searchForm

      searchObj = _.pickBy(this.searchForm, item => item)

			 var { start, limit } = this.page
      NewsApi.getnewList({
        start,
        limit,
        ...searchObj
      }).then(res => {
        Object.assign(this.page, {
          limit: res.data.pageSize,
          totalPage: res.data.totalPage,
          totalCount: res.data.totalRow
        })
        this.loading = false
        this.newsList = res.data.list
        console.log(res.data.totalPage)
        console.log(res.data.totalRow)
      })
    },
    goAdd() {
      this.$refs.edit.openDialog()
    },
    handleEdit(id) {
      this.$refs.edit.openDialog(id)
    },
    handleDelete(row, id) {
      var r = confirm('确定要删除吗?')
      if (r === true) {
        NewsApi.delnewList({
          id
        }).then(res => {
          this.getnewsList()
        })
      }
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page.start = val
      this.getnewsList()
    },
    reset() {

    },
    doSearch() {
      this.getnewsList()
    },
    onEditorChange($event) {
      console.log($event)
    },
    imageHandler() {
      var range = this.quill.getSelection()
      var value = prompt('What is the image URL')
      if (value) {
        this.quill.insertEmbed(range.index, 'image', value)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.imgs{
	width: 180px;
	height: 80px;
}
</style>
