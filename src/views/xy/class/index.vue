<template>
	<div class="class-main">
		<el-card class="search-box" shadow="never">
			<div slot="header">
				<span>搜索条件</span>
			</div>
			<el-form :model="searchForms" ref="searchForms" label-width="80px" size="small">
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="班级">
							<el-input v-model="searchForms.className" value="searchForms.type"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="类型">
							<el-select v-model="searchForms.type" clearable placeholder="请选择">
								<el-option label="前端" value="0"></el-option>
								<el-option label="Ui" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="开始时间">
							<el-date-picker value-format="yyyy-MM-dd" v-model="searchForms.startTime" class="basic" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
							<el-form-item class="basi" label="结束时间">
								<el-date-picker value-format="yyyy-MM-dd" v-model="searchForms.endTime" class="basic" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4" :offset="20">
						<el-button size="small" @click="reset">重置</el-button>
						<el-button size="small" type="primary" @click="doSearch(searchForms.type)">查询</el-button>
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
						<el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
						 :current-page="page.start" :page-sizes="[5,10,15]" :page-size="page.limit" layout="total, sizes, prev, pager, next, jumper"
						 :total="page.totalCount"></el-pagination>
					</el-col>
				</el-row>
			</div>
			<el-table :data="classList" border stripe style="width: 100%">
				<el-table-column prop="className" label="班级" width="180">
				</el-table-column>
				<el-table-column prop="startTime" label="开始时间" width="180">
				</el-table-column>
				<el-table-column prop="endTime" label="结束时间" width="180">
				</el-table-column>
				<el-table-column prop="type" label="类型" width="180">
				<template slot-scope="scope">
					{{scope.row.type == "0"? "前段":"UI"}}
				</template>	
				</el-table-column>
				<el-table-column prop="desc" label="班级描述">
				</el-table-column>
				<el-table-column label="操作" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row,scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<Clazs  ref="cizz" :clazzdent="clazzdent"></Clazs>
	</div>
</template>

<script>
	import ClassApi from "@/api/clazz";
	import Clazs from './addclass/clazz'
	import { resetData } from "@/utils/index";
	import _ from "lodash";
	export default {
		name: 'Clazz',
		components: {
			Clazs
		},
		data() {
			return {
				loading: true,
				isclazs: false,
				classList: [
					
				],
				page: {
					start: 1, //当前页
					limit: 5, // 每页大小
					totalCount: 0, //总数
					totalPage: 0 // 总页数
				},
				clazzdent:{},
				classlists:[],
				searchForms:{
					className:"",
					type:""
				}
			}
		},
		created() {
			this.getClassList();
		},
		methods: {
			reset(){
				
			},
			doSearch(type){
				resetData(this, "page");
				this.getClassList(type);
			},
			goAdd() {
				this.$refs.cizz.openDialog();
			},
			handleEdit(row) {
				
				var id = row.id;
				this.$refs.cizz.openDialog();
				ClassApi.detailClassList({
					id
				}).then(res=>{
					this.clazzdent = res.data;
					var that = this;
					setTimeout(function() {
						that.$refs.cizz.abb();
					}, 20)
				})
				
			},
			handleDelete(row,id) {
				var r = confirm("确定要删除吗?");
				if(r == true){
					ClassApi.removeClassList({
						id
					}).then(res=>{
						this.getClassList();
					})
				}
				
			},
			handleSizeChange(val) {
				
			},
			handleCurrentChange(val) {
				//先改变page对象
				this.page.start = val;
				this.getClassList();
				
			},
			getClassList(type) {
				this.loading = true;
				var searchObj = this.searchForms;
				
				 searchObj = _.pickBy(this.searchForms, item => item);
				console.log(type);
				var {
					start,
					limit
				} = this.page;
				ClassApi.getClassList({
					start,
					limit,
					
				}).then(res => {
					Object.assign(this.page, {
						limit: res.data.pageSize,
						totalPage: res.data.totalPage,
						totalCount: res.data.totalRow
					});
					this.loading = false;
					this.classList = res.data.list;
					
					
				});
			},
		}
	}
</script>

<style lang='scss' scoped>
	.class-main {

		.table-box {
			margin: 30px 20px;
		}

		.pagination {
			text-align: right;
		}
	}
</style>
