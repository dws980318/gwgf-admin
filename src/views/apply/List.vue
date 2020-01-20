<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label="">
              <el-input size="small" v-model="searchData.name" placeholder="渠道商名称、姓名或电话"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-date-picker size="small" v-model="selectDate" type="daterange" align="right" unlink-panels
                              value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
                              end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="searchData.state" clearable placeholder="请选择状态">
                <el-option v-for="(item, key, index) in state_list" :key="index" :label="item" :value="key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="50">
              <el-button type="primary" size="small" icon="el-icon-search" @click="hanldeSeach()">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table">
          <el-table :data="tableData" border :header-cell-style="{background:'#fafafa'}"
                    v-loading="loading" style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="id" align="center" width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="渠道商" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.distributor }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <p><span>{{ scope.row.name }}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" align="center">
              <template slot-scope="scope">
                <p><span>{{ scope.row.phone }}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="拒绝理由" align="center">
              <template slot-scope="scope">
                <p><span :class="{'error-state': scope.row.reason}">{{ scope.row.reason ? scope.row.reason : '无'}}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="80"
              align="center">
              <template slot-scope="scope">
                <span :class="scope.row.state===1?'success-state':''||scope.row.state===2?'error-state':''||scope.row.state===0?'warning-state':''">{{ state_list[scope.row.state] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160px" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.state === 0">
                  <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row.id)">通过</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">拒绝</el-button>
                </div>
                <div v-else>
                  <span class="success-state">已审核</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchData.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="拒绝理由"
      :visible.sync="visible"
      top="30vh"
      width="60%"
      center>
      <div class="model_form">
        <el-form :model="refuse" ref="checkForm" label-width="150px" :rules="formrules">
          <el-form-item label="id：" prop="typeid">
            <p>{{refuse.id}}</p>
          </el-form-item>
          <el-form-item label="拒绝理由：" prop="reason">
            <el-input style="width: 90%" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" resize="none" show-word-limit v-model="refuse.reason" placeholder="请输入拒绝理由"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">确定</el-button>
        <el-button size="small" @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "List",
    data() {
      return {
        loading: false,
        visible: false,
        refuseIndex: 0,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        formrules: {},
        state_list: {
          2: '已拒绝',
          1: '已通过',
          0: '申请中'
        },
        tableData: [],// 用于存放数据
        selectDate: [],
        searchData: {
          startDate: '',
          endDate: '',
          name: '',
          state: '',
          currentPage: 1,
          pageSize: 10
        },
        page:{
          total: 0
        },
        refuse: {
          id: 0,
          reason: ''
        }
      }
    },
    watch: {
      selectDate(val, oldVal) {
        if(val) {
          this.searchData.startDate = val[0]
          this.searchData.endDate = val[1]
        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        console.log(this.searchData)
        this.loading = true
        let newData = [
          {
            id: 1,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '电话打不通！',
            creatTime: '2019-03-06 09:45:55',
            state: 2
          },
          {
            id: 2,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          },
          {
            id: 3,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          },
          {
            id: 4,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          },
          {
            id: 5,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '电话打不通！',
            creatTime: '2019-03-06 09:45:55',
            state: 2
          },
          {
            id: 6,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          },
          {
            id: 7,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '电话打不通！',
            creatTime: '2019-03-06 09:45:55',
            state: 2
          },
          {
            id: 8,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '电话打不通！',
            creatTime: '2019-03-06 09:45:55',
            state: 2
          },
          {
            id: 9,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '电话打不通！',
            creatTime: '2019-03-06 09:45:55',
            state: 2
          },
          {
            id: 10,
            distributor: '广州（天河区）分销点',
            name: '石峥嵘',
            phone: 12345678910,
            reason: '电话打不通！',
            creatTime: '2019-03-06 09:45:55',
            state: 2
          }
        ]
        this.tableData = newData
        this.page.total = newData.length
        setTimeout(() => {
          this.loading = false
        }, 1500)
      },
      hanldeSeach() { // 搜索
        this.init()
      },
      handleEdit(index, id) {
        this.tableData[index].state = 1
        this.$message.success('通过成功！')
      },
      handleDelete(index, id) {
        this.refuseIndex = index
        this.refuse.id = id
        this.visible = true
        // this.tableData[index].state = 1
        // this.$message.success('删除成功！')
      },
      submitUpload() {
        if (!this.refuse.reason) {
          this.$message.error('请先填写拒绝理由')
          return false
        }
        this.tableData[this.refuseIndex].state = 2
        this.tableData[this.refuseIndex].reason = this.refuse.reason
        this.visible = false
        this.$message.success('拒绝成功！')
      },
      handleSizeChange(val) {
        this.searchData.currpage = 1
        this.searchData.pageSize = val
        this.init()
      },
      handleCurrentChange(val) {
        this.searchData.currpage = val
        this.init()
      }
    }
  }
</script>

<style scoped>
  .preview {
    width: 240px;
    height: auto;
  }

  .warning-state {
    color: #e3853a;
  }

  .success-state {
    color: #67C23A;
  }

  .error-state {
    color: #F56C6C;
    padding: 0 5px;
  }
</style>
