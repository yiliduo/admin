<template>
  <div class="material-main" @click="niupi($event)">
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
      <el-row>
        <el-col :span="6">
          <el-upload
            :file-list="fileList"
            action="/admin/xy/upload/uploadImg"
            class="upload-demo"
          >
            <el-button size="small" type="primary" @click="acc">添加素材</el-button>

          </el-upload>
          <el-button v-show="qaq" size="small" @click="goAdd">上传</el-button>
        </el-col>
        <Mypaging :page="page" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" />

        <el-col v-for="(image, index) in images" :span="6" class="colos">

          <img :src="image.src" class="aimg" alt="" @click="openGallery(index)">

          <span v-show="titleing != image.id" class="spa">{{ image.title }}</span>

          <input
            v-show="titleing== image.id"
            v-model="image.title"
            class="crdzg"
            type="text"
            style="width: 220px; height: 32px; margin-left: 50px; margin-top: 8px;"
            @keyup.enter="doten(image.title,image.id)"
          >

          <div class="burger" style="padding: 14px;">

            <div class="bottom clearfix">

              <span class="icons shad" @click="app(image.id,$event)">
                <img class="aini" src="@/assets/bian.png" alt="">
              </span>

              <span class="icons a">
                <img src="@/assets/tu.png" alt="">
              </span>
              <span class="icons a" @click="removes(image.id)">
                <img src="@/assets/shan.png" alt="">
              </span>

            </div>
          </div>

        </el-col>
        <LightBox
          ref="lightbox"
          :images="images"
          :show-caption="true"
          :show-light-box="false"
          :n-thumbs="0"
        />
      </el-row>

    </el-card>
  </div>
</template>

<script>
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')
import LightBox from 'vue-image-lightbox'

import UploadApi from '@/api/material.js'
import { resetData } from '@/utils/index'
import paginationMiXin from '@/mixin/pagination.js'
// import siteLoading from './siteloading.gif'
import Mypaging from '@/components/Paging/mypaging.vue'
import _ from 'lodash'
export default {
  name: 'Material',
  components: {
    Mypaging,
    LightBox
  },
  mixins: [paginationMiXin],
  data() {
    return {
      searchForm: {
        title: ''
      },
      uploadList: [],
      page: {
				  limit: 12,
				  pageSplit: [12, 24, 36]
      },
      titleing: '',
      fileList: [],
      qaq: false

    }
  },
  computed: {
    images() {
      return this.uploadList.map(item => {
        if (item.id) {
          item.thumb = 'http://59.110.138.169/media/' + item.fileName
          item.src = 'http://59.110.138.169/media/' + item.fileName
          item.caption = '<p>123</p>'
          return item
        }
      })
    }
  },
  created() {
    this.getuploadList()
  },
  // 		mounted(){
  // 			var that = this;
  // 			setTimeout(function(){
  // 				var inp  = document.querySelector('.crdzg');
  // 				var bian = document.querySelector('.clearfix');
  // 				var body = document.querySelector('body');
  //
  //
  // 				body.onclick = function(e){
  // 					console.log(e.target);
  // 					if(e.target != inp&&e.target!=bian){
  // 						console.log(that.titleing);
  // 					}
  // 				}
  // 			},1000)
  //
  // 		},
  methods: {
    getuploadList() {
      var searchObj = this.searchForm

      searchObj = _.pickBy(this.searchForm, item => item)

      // eslint-disable-next-line no-mixed-spaces-and-tabs
				 var { start, limit } = this.page
      UploadApi.getuploadList({
        start,
        limit,
        ...searchObj
      }).then(res => {
        Object.assign(this.page, {
          limit: res.data.pageSize,
          totalPage: res.data.totalPage,
          totalCount: res.data.totalRow
        })

        this.uploadList = res.data.list
      })
    },
    niupi(e) {
      var target = e.target
      console.log(target)
      var imgs = document.querySelectorAll('.aini')
      // 				console.log(imgs);
      // 				if(target!==imgs){
      // 					this.titleing = '';
      // 				}
    },
    acc() {
      var that = this
      setTimeout(function() {
        that.qaq = true
      }, 1000)
    },
    openGallery(index) {
      console.log(index)
      this.$refs.lightbox.showImage(index)
    },
    goAdd() {
      var that = this
      setTimeout(function() {
        that.$router.go(0)
        that.qaq = false
      }, 100)
    },
    app(id, e) {
      var target = e.target
      var input = target.parentNode.parentNode.parentNode.previousElementSibling
      this.titleing = id

      this.$nextTick(() => {
        input.focus()
      })
    },
    doten(title, id) {
      this.titleing = ''

      UploadApi.touploadList({
        id,
        title
      }).then(res => {
        console.log(res)
      })
    },
    removes(id) {
      console.log(this.siteLoading)
      var r = confirm('确定要删除吗?')
      if (r == true) {
        UploadApi.deluploadList({
          id
        }).then(res => {
          this.getuploadList()
        })
      }
    },
    reset() {

    },
    doSearch() {

    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page.start = val
      this.getuploadList()
    }
  }
}
</script>

<style lang='scss' scoped>
	.colos{
		margin-top: 15px;
		height: 360px;
	}
	.upload-demo{
		margin-left: 20px;
	}
	.spa{
		width: 100%;
		height: 35px;
		line-height: 35px;
		text-align: center;
		display: block;
	}
	.clearfix{
		width: 100%;
		height: 40px;
		border: 1px solid #f5f5f5;
		background-color: #f3f3f3;
	}
	.aimg{
		width: 92%;
		margin: 0 auto;
		height: 250px;

	}
	.icons{
		display: block;
		width: 25px;
		height: 25px;
		margin-left: 48px;

		margin-top: 5px;
		float: left;
		&.a{
			margin-top: 7px;
		}
		img{
			width: 100%;
			height: 100%;
		}
	}
</style>
