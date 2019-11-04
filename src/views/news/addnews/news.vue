<template>
	<div class="news-conter">
		<el-dialog title="文章内容" :visible.sync="dialog" width="70%">
			<span class="spa">添加内容</span>

			<el-form ref="forms" :model="forms">


				<el-form-item class="basi" size="small">标题
					<el-input class="basic" v-model="forms.title" autocomplete="off" placeholder="必填内容"></el-input>
				</el-form-item>

				<el-form-item class="basi" size="small">作者
					<el-input class="basic" v-model="forms.author" autocomplete="off" placeholder="默认为用户名"></el-input>
				</el-form-item>

				<div class="grid-content bg-purple">
					<el-form-item class="basi" size="small">类型
						<el-switch v-model="forms.hot"active-value="0"
						inactive-value="1" class="nas" @click="aqq"></el-switch>
					</el-form-item>
				</div>

				<div class="grid-content bg-purple">
					<el-form-item class="basi" size="small">封面
							<el-button size="small" class="nas" @click="base">从素材库选择</el-button>
					</el-form-item>
					
					<el-card class="table-box" v-show="materialbase" style="height: 350px;">
						<el-row>
						<el-col :span="18">
							<Mypaging  :page="page" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></Mypaging>
						</el-col>
						<el-col :span="3">
							<el-upload
							  action="/admin/xy/upload/uploadImg"
							  :file-list="fileList" :show-file-list="avater" :on-success="handleAvatarSuccess">
							  <el-button size="small" type="primary" @click="qcq">点击上传</el-button>
							</el-upload>	
						</el-col>
						<el-col :span="2">
							<el-button size="small" v-show="qaq" @click="upper">确定上传</el-button>
						</el-col>
						
						 <el-col :span="4" v-for="(image, index) in uploadList" class="colos">
							 <img  @click="obtain(image.fileName,image.id)" :src="imgs+image.fileName" class="aimg"  alt="">
							 <i class="el-icon-check" v-show="selection ==image.id"></i>
						  </el-col>
						  <div class="base">
							<el-button size="small" @click="cancelSave">取 消</el-button>
						  	<el-button type="primary" @click="handlebase" size="small">确 定</el-button>
						  </div>
						  	 
						</el-row>
						
					</el-card>
				</div>
				<div class="couer" v-show="opens">
					<img :src="forms.cover" alt="">
				</div>
				<el-form-item size="small" class="moneys">描述
					<el-input type="textarea" class="bbsp" v-model="forms.desc"></el-input>
				</el-form-item>

				<el-form-item class="basi" size="small">
					<div class="btns">
						<el-button size="mini" @click="bbt(1)" class="bbt a">富</el-button>
						<el-button size="mini" @click="bbt(2)" class="bbt b">MD</el-button>
					</div>
					<quill-editor v-show="doding" class="cici" ref="quilledits"
					            :options="editorOption"
								v-model="content"
					            @change="onEditorChange($event)">
					</quill-editor>
					<MarkdownEditor v-show="!doding" class="cici" ref="markdown" v-model="forms.content1"></MarkdownEditor>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="cancelSaves">取 消</el-button>
				<el-button type="primary" @click="handleSave" size="medium">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import MarkdownEditor from '@/components/MarkdownEditor/index'
	import { quillEditor } from 'vue-quill-editor'
	import UploadApi from "@/api/material.js"
	import Mypaging from '@/components/Paging/mypaging.vue'
	import paginationMiXin from '@/mixin/pagination.js'
	import NewsApi from "@/api/news";
	import { resetData } from "@/utils/index";
	export default {
		name: 'Newsedit',
		components: {
			quillEditor,
			MarkdownEditor,
			Mypaging
		},
		mixins:[paginationMiXin],
		data() {
			return {
				imgs:'http://59.110.138.169/media/',
				dialog: false,
				editorOption: {},
				quills: '',
				content: '',
				contents:'',
				doding: true,
				selection:'',
				opens:false,
				qaq:false,
				avater:true,
				forms: {
					title: '',
					desc: '',
					author: '',
					hot: '',
					type: '',
					cover: '',
					content1: '',
					content2:''
				},
				uploadList:[],
				fileList: [],
				sureDel:'',
				page:{
				  limit: 12,
				  pageSplit: [12,24,36]
				},
				materialbase: false
			}
		},
		
		mounted(){
			
			// console.log('==>',this.$refs.quilledits)
// 			var that = this;
// 			that.$nextTick(()=> {
// 				console.log(that.$refs);
// 			});
// 			
// 			that.sureDel = function (){
// 				that.$nextTick(()=> {
// 				console.log(that.$refs);
// 				that.quills = that.$refs.quilledit.quill;
// 				that.quills.getModule('toolbar').addHandler('image', that.imageHandler);
// 				});
// 			}
				
			
			
		},
		created() {
			this.getuploadList();
		},
		methods: {
			openDialog(id) {
				this.dialog = true;
				if(id){
					this.getStudentInfo(id);
				}
				this.forms = {};
				// this.sureDel();
			},
			getStudentInfo(id){
				NewsApi.detailenewList({
					id
				}).then(res=>{
					console.log(res.data);
					this.forms = res.data;
					
				})
			},
			aqq(){
				
			},
			qcq(){
				setTimeout(()=>{
					this.qaq = true;
				},2000)
				
			},
			upper(){
				setTimeout(()=>{
					this.getuploadList();
					this.qaq = false;
					this.avater = false;
				},20)
			},
			getuploadList(){
				 var { start, limit } = this.page;
				UploadApi.getuploadList({
					start,
					limit,
					
				}).then(res => {
					Object.assign(this.page, {
						limit: res.data.pageSize,
						totalPage: res.data.totalPage,
						totalCount: res.data.totalRow
					});
					
					this.uploadList = res.data.list;
					
				});
			},
			cancelSave() {
				this.materialbase = false;
				
			},
			base(){
				this.materialbase = true;
			},
			bbt(type){
				if(type == 1){
					this.doding = true;
				}else{
					this.doding = false;
				}
			},
			handlebase(){
				if(this.forms.cover){
					this.materialbase = false;
					this.opens = true;
				}else{
					alert('请选择封面')
				}
			},
			obtain(url,id){
				this.selection = id;
				this.forms.cover = this.imgs+url;
				
			},
			handleSave() {
				
				 if(this.forms.content2 == ""){
					 
				 }else{
					console.log('1',this.content)
					this.forms.content1 = this.content;
					console.log(this.forms.content1);
					this.forms.content2 = this.$refs.markdown.getHtml();
					console.log(this.forms.content2);
				 }
				 var api = "";
				 if (this.forms.id) {
				 	api = NewsApi.updatenewList;
				 } else {
				 	api = NewsApi.savenewList;	
				 }
				 api({
				 	xyNews: this.forms,
				 }).then(res=>{
					 
				 	if (res.code == "success") {
				 		this.$message({
				 			type: "success",
				 			message: "保存成功"
				 		})
				 		this.forms = {};
				 		this.$parent.getnewsList();
				 	}
				 })
				 this.dialog = false;
				 
			},
			cancelSaves(){
				this.forms = {};
				this.dialog = false;
				
			},
			onEditorChange($event) {
				console.log($event);
				
			},
			imageHandler() {
				var range = this.$quills.getSelection();
				var value = prompt('What is the image URL');
				if (value) {
					this.$quills.insertEmbed(range.index, 'image', value);
				}
			},
			handleSizeChange(val){
				console.log(val);
			},
			handleCurrentChange(val){
				this.page.start = val;
				this.getuploadList();
			},
			handleAvatarSuccess(res,file,list) {
				 console.log(res);
				 console.log(file);
				 console.log(list);
			},
		},
		watch:{
			dialog(nv,ov){
				if(nv){
					this.$nextTick(()=>{
						if(!this.$quills){	
							this.$quills = this.$refs.quilledits.quill;
							this.$quills.getModule('toolbar').addHandler('image', this.imageHandler);	
							this.$markdown = this.$refs.markdown;
							
						}
					})
					
				}
			}
		}
		
	}
</script>

<style lang='scss' scoped>
	.spa {
		display: block;
		width: 98%;
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #f1f1f1;
	}

	.basic {
		width: 188px;
		margin-left: 10px;

		&.s {
			margin-left: 70px;
		}
	}
	.aimg{
		width: 100px;
		
		height: 100px;
		
	}
	.couer{
		width: 180px;
		height: 180px;
		margin-top: 10px;
		margin-left: 100px;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.basi {
		margin-left: 38px;
		margin-top: 10px;
	}

	.cici {
		width: 85%;
		margin-left: 75px;
	}
	.base{
		position: absolute;
		right: 50px;
		top: 285px;
	}
	.one {
		margin-left: 30px;
	}

	.nas {
		margin-left: 20px;
	}

	.moneys {
		margin-left: 40px;
		margin-top: 10px;
	}
	.colos{
		margin-top: 15px;
	}
	.bbsp {
		width: 70%;
		margin-left: 30px;

	}

	.btns {
		position: relative;

		.bbt {
			position: absolute;
			left: 0px;
			margin: 0;
			width: 50px;

			&.b {
				left: 0;
				top: 35px;
			}
		}
	}
</style>
