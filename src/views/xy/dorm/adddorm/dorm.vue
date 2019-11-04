<template>
  <div class="dorms-main">
    <el-dialog title="添加班级" :visible.sync="dialog" width="70%">
      <span class="spa">详情信息</span>

      <el-form ref="forms" :model="forns">
        <el-row :gutter="20">
          <el-col :span="7" class="one">
            <el-form-item class="basi" size="small">宿舍
              <el-input v-model="forns.name" class="basic" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="basi" size="small">类型
              <el-select v-model="forns.type" class="basic" clearable placeholder="请选择">
                <el-option label="男生宿舍" value="0" />
                <el-option label="女生宿舍" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="nai">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">开班时间
                <el-date-picker v-model="forns.startTime" value-format="yyyy-MM-dd" class="basic" type="date" placeholder="选择日期" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">结束时间
                <el-date-picker v-model="forns.endTime" value-format="yyyy-MM-dd" class="basic" type="date" placeholder="选择日期" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8" class="nas">
            <el-form-item size="small" class="moneys" label="描述">
              <el-input v-model="forns.bak" type="textarea" style="width: 250px; height: 60px;" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="cancelSave">取 消</el-button>
        <el-button type="primary" size="medium" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DormApi from '@/api/dorm.js'
import { resetData } from '@/utils/index'
export default {
  name: 'Dormedit',
  props: {
    dormdent: Object
  },
  data() {
    return {
      dialog: false,
      forns: {
        name: '',
        type: '',
        startTime: '',
        endTime: '',
        bak: ''
      }
    }
  },
  methods: {
    handleSave() {
      var api = ''
      if (this.forns.id) {
        api = DormApi.updateDormList
      } else {
        api = DormApi.saveDormList
      }
      api({
        xyDormInfo: this.forns
      }).then(res => {
        if (res.code == true) {
          this.$message({
            type: 'success',
            message: '保存成攻'
          })
          this.forns = {}
          this.$parent.getdormList()
        }
      })
      this.dialog = false
    },
    acc() {
      this.forns = this.dormdent
    },
    cancelSave() {
      this.dialog = false
      this.forns = {}
    },
    openDialog() {
      this.dialog = true
      this.forns = {}
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
