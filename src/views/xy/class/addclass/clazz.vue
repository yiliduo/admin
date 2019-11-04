<template>
	<div class="clazz-main">
		<el-dialog title="添加班级" :visible.sync="dialog" width="70%">
			<span class="spa">详情信息</span>
			
			<el-form ref="forms" :model="forms" >
				<el-row :gutter="20">
					<el-col :span="7" class="one">
						<el-form-item class="basi" size="small">班级
							<el-input class="basic" v-model="forms.className" autocomplete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item class="basi" size="small">类型
							<el-select v-model="forms.type" class="basic" clearable placeholder="请选择">
								<el-option label="前段" value="0"></el-option>
								<el-option label="Ui" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8" class="nai">
						<div class="grid-content bg-purple">
							<el-form-item class="basi" size="small">开班时间
								<el-date-picker value-format="yyyy-MM-dd" v-model="forms.startTime" class="basic" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<el-form-item class="basi" size="small">结束时间
								<el-date-picker value-format="yyyy-MM-dd" v-model="forms.endTime" class="basic" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="8" class="nas">
						<el-form-item size="small" class="moneys" label="备注">
							<el-input type="textarea" style="width: 250px; height: 60px;" v-model="forms.desc"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="cancelSave">取 消</el-button>
				<el-button type="primary" @click="handleSave" size="medium">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import ClassApi from "@/api/clazz";
	import { resetData } from "@/utils/index";
	export default {
		name: 'Clazzedit',
		props:{
			clazzdent: Object
		},
		data() {
			return {
				dialog: false,
				forms:{
					className: '',
					type:'',
					startTime: '',
					endTime:'',
					desc:''
				}
			}
		},
		created() {
			
		},
		mounted() {
			console.log(this.$refs);
			this.$nextTick(()=> {
				console.log(this.$refs.forms);
			  
			});
		},
		methods: {
			openDialog() {
				this.dialog = true;
				// resetData(this,"forms")
				this.forms = {};
			},
			cancelSave() {
				this.dialog = false;
				this.forms = {};
			},
			abb(){
				this.forms = this.clazzdent
			},
			handleSave(){
				var api = "";
				if (this.forms.id) {
					api = ClassApi.updateClassList;
				} else {
					api = ClassApi.saveClassList;	
				}
				api({
					xyClassInfo: this.forms,
				}).then(res=>{
					if (res.code == true) {
						this.$message({
							type: "success",
							message: "保存成攻"
						})
						this.forms = {};
						this.$parent.getClassList();
						
					}
				})
				this.dialog = false;
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
	}
	.basi {
		margin-left: 38px;
		margin-top: 10px;
	}
	.one{
		margin-left: 30px;
	}
	.nas{
		margin-left: 25px;
	}
</style>
