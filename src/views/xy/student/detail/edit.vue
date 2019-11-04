<template>
  <div class="student-detail-main">
    <el-dialog class="dialos" title="添加学员信息" width="70%" :visible.sync="dialog">
      <span>基本信息</span>
      <el-form ref="form" class="bas" :model="form" :rules="rules">
        <el-row class="rows" :gutter="20">
          <el-col :span="7" class="one">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small" prop="name">姓名
                <el-input v-model="form.name" class="basic" autocomplete="off" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small" prop="sex">性别
                <el-select v-model="form.sex" class="basic" clearable placeholder="请选择">
                  <el-option label="男" value="0" />
                  <el-option label="女" value="1" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small" prop="classId">班级
                <el-select v-model="form.classId" class="basic" clearable placeholder="请选择">
                  <el-option v-for="ite in clazzList" :key="ite.id" :label="ite.className" :value="ite.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7" class="one">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small" prop="tel">电话
                <el-input v-model="form.tel" class="basic" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8" class="seve">
            <div class="grid-content acc bg-purple">
              <el-form-item class="basi" size="small">身份证
                <el-input v-model="form.manID" class="basic" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7" class="eity">
            <el-form-item class="basi" size="small">城市
              <el-cascader v-model="form.city" size="small" :options="options" class="basic" />
            </el-form-item>
          </el-col>
          <el-col :span="7" class="one">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">宿舍
                <!-- <el-input v-model="form.dormId" class="basic"></el-input> -->
                <el-select v-model="form.dormId" class="basic" clearable placeholder="请选择">
                  <el-option v-for="ite in dormLists" :key="ite.id" :label="ite.name" :value="ite.id" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8" class="nai">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">入住日期
                <el-date-picker
                  v-model="form.dormStartTime"
                  value-format="yyyy-MM-dd"
                  class="basic"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">离开日期
                <el-date-picker
                  v-model="form.dormEndTime"
                  value-format="yyyy-MM-dd"
                  class="basic"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
            </div>
          </el-col>
          <span class="gang">补充信息</span>
          <el-col :span="8" class="ku ten">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">紧急联系人
                <el-input v-model="form.tel2" class="basic" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8" class="ku">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">微信
                <el-input v-model="form.wx" class="basic" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8" class="ku oneo">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">qq
                <el-input v-model="form.qq" class="basic" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8" class="sev">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">毕业院校
                <el-input v-model="form.school" class="basic" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8" class="sev">
            <div class="grid-content bg-purple">
              <el-form-item class="basi" size="small">工作
                <el-input v-model="form.job" class="basic" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span class="gsng">缴费信息</span>
      <span v-show="!records" class=" avd" @click="addgo">添加费用记录 +</span>
      <el-card
        v-show="records"
        class="box-card"
        style="width: 90%; height: 190px; margin: 0 auto; margin-top: 60px;"
        shadow="hover"
      >
        <el-form :model="paylists">
          <el-form-item class="moneys" style="width: 250px;">类型
            <el-radio-group v-model="paylists.costType">
              <el-radio label="0" style="margin-left: 10px;">学费</el-radio>
              <el-radio label="1">住宿费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item size="small" class="moneys">金额
            <el-input v-model="paylists.costValue" style="width: 200px;" />
          </el-form-item>
          <el-form-item size="small" class="moneys" style="width: 280px;">交费时间
            <el-date-picker v-model="paylists.costTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item
            size="small"
            class="moneys"
            style="width: 300px;margin-top: 20px; margin-left: -200px; height: 90px;"
            label="备注"
          >
            <el-input v-model="paylists.costBak" type="textarea" style="width: 250px; height: 60px;" />
          </el-form-item>
          <el-button class="bts" size="mini" @click="cancel">取消</el-button>
          <el-button type="primary" size="mini" @click="godetermine">确定</el-button>
        </el-form>
      </el-card>

      <el-table :data="tableData" border stripe style="width: 90%;  margin: 0 auto; margin-top: 40px;">
        <el-table-column type="index" width="50" />
        <el-table-column prop="costType" label="类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.costType == '0'? '学费': '住宿费' }}
          </template>
        </el-table-column>
        <el-table-column prop="costValue" label="金额" width="150" />
        <el-table-column prop="costTime" label="时间" width="200" />
        <el-table-column prop="costBak" label="备注" />
        <el-table-column prop="operations" label="操作" width="150">
          <template v-if="!scope.row.id" slot-scope="scope">
            <el-button type="text" size="small" @click="delClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSave">取 消</el-button>

        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ClassApi from '@/api/clazz'
import DormApi from '@/api/dorm'
import StudentApi from '@/api/student'
import { handlepaylists, resetData } from '@/utils/index.js'
import {
  regionData
} from 'element-china-area-data'

export default {
  name: 'StudentDetail',
  props: {
    studentss: Object
  },
  data() {
    return {
      dialog: false,
      loading: true,
      options: regionData,
      form: {
        name: '',
        classId: '',
        sex: '',
        paylist: []
      },
      records: false,
      clazzList: {},
      dormLists: {},
      tableData: [],
      tableDatanew: [],
      paylists: {},
      rules: {
        name: [{
          required: true,
          message: '请输入正确的用户名',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 15,
          message: '长度在 1 到 15 个字符',
          trigger: 'blur'
        }
        ],
        tel: [{
          required: true,
          message: '请输入正确的手机号',
          trigger: 'blur'
        },
        {
          min: 11,
          max: 11,
          message: '长度为11位',
          trigger: 'blur'
        }
        ],
        classId: [{
          type: 'string',
          required: true,
          message: '请选择班级',
          trigger: 'change'
        }]
      }
    }
  },
  created() {
    this.getClazzList()
  },
  methods: {
    cancelSave() {
      this.dialog = false
      this.form = {}
    },
    addgo() {
      this.records = true
    },
    cancel() {
      this.records = false
    },
    godetermine() {
      this.records = false
      var ordata = _.cloneDeep(this.paylists)
      ordata.tempId = new Date().getTime()
      this.tableData.push(ordata)
      this.tableDatanew.push(ordata)

      resetData(this, 'paylists')
    },
    ass() {
      this.form = this.studentss
    },
    delClick(row) {
      this.tableData = this.tableData.filter(item => item.tempId != row.tempId)
      this.tableDatanew = this.tableDatanew.filter(item => item.tempId != row.tempId)
    },
    handleSave() {
      var api = ''
      if (this.form.id) {
        api = StudentApi.updateStudent
      } else {
        api = StudentApi.saveStudent
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          api({
            xyUser: this.form,
            ...handlepaylists('xyCostItems', this.tableDatanew)
          }).then(res => {
            if (res.code == 'success') {
              this.$message({
                type: 'success',
                message: '保存成攻'
              })
              this.dialog = false
              this.form = {}
              this.$parent.getStudentList()
            }
          })
        } else {

        }
      })
    },
    openDialog() {
      this.dialog = true
      resetData(this, 'tableData')
      this.form = {}
    },
    getClazzList() {
      ClassApi.getClassList().then(res => {
        this.clazzList = res.data.list
      })
      DormApi.getDormList().then(res => {
        this.dormLists = res.data.list
      })
    }
  }

}
</script>

<style lang='scss' scoped>
  .one {
    margin-left: 20px;
  }

  .rema {
    width: 400px;

    text-align: left;
  }

  .oneo {
    margin-left: 10px;
  }

  .bts {
    margin-left: 300px;
    margin-top: 50px;
  }

  .sev {
    margin-left: -10px;
  }

  .moneys {
    width: 250px;
    float: left;
    margin-left: 20px;
  }

  .lodin {
  }

  .gang {
    position: absolute;
    left: 10px;
    top: 200px;
    display: block;
    width: 98%;
    height: 30px;
    border-bottom: 1px solid #f1f1f1;
  }

  .gsng {
    position: absolute;
    left: 20px;
    top: 500px;
    display: block;
    width: 97%;
    height: 30px;
    border-bottom: 1px solid #f1f1f1;
  }

  .avd {
    position: absolute;
    left: 880px;
    top: 500px;
    color: orange;
    font-size: 14px;
    cursor: pointer;
  }

  .ku {
    margin-top: 65px;
  }

  .ten {
    margin-left: -20px;
  }

  .bas {
    border-top: 1px solid #f1f1f1;
    margin: 0 auto;
    margin-top: 10px;
    height: 400px;
  }

  .seve {
    margin-left: -15px;

  }

  .eity {
    margin-left: 15px
  }

  .nai {
    margin-left: -30px;
  }

  .basi {
    margin-left: 38px;
    margin-top: 10px;
  }

  .basic {
    width: 188px;
    margin-left: 8px;
  }

  .rows {
    margin: 0;
    position: relative;
  }
</style>
