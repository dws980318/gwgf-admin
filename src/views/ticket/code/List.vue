<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
<!--            <el-form-item label-width="50">-->
<!--              <el-button type="success" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>-->
<!--            </el-form-item>-->
            <el-form-item label-width="50">
              <el-button type="warning" size="small" icon="el-icon-download" @click="download()">导出</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-input size="small" v-model="searchData.name" placeholder="奖项、姓名或电话"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="searchData.typeid" clearable placeholder="请选择游戏">
                <el-option v-for="(item, key, index) in options" :key="index" :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
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
          <!--          :row-class-name="tableRowClassName"--><!-- 根据状态选择样式-->
          <el-table :data="tableData" border :header-cell-style="{background:'#fafafa'}"
                    v-loading="loading" style="width: 100%">
            <el-table-column label="id" align="center" width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="奖项名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="游戏" align="center">
              <template slot-scope="scope">
                <span>{{ selectOptions(scope.row.typeid) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="中奖时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="兑换状态" width="100" align="center">
              <template slot-scope="scope">
                <span v-if="Boolean(scope.row.state)" class="success-state">已核销</span>
                <el-button v-else size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">核销</el-button>
              </template>
            </el-table-column>
<!--            <el-table-column label="操作" fixed="right" width="80px" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">核销</el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
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
  </div>
</template>

<script>
  export default {
    name: "List",
    data() {
      return {
        visible: false,
        loading: false,
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
        options: [
          {
            id: 1,
            name: '拆红包'
          },
          // {
          //   id: 2,
          //   name: '转轮盘'
          // }, {
          //   id: 3,
          //   name: '刮刮乐'
          // }
        ],
        formrules: {},
        state_list: {
          1: '已核销',
          0: '未核销'
        },
        tableData: [],// 用于存放数据
        selectDate: [],
        searchData: {
          startDate: '',
          endDate: '',
          name: '',
          state: '',
          typeid: '',
          currentPage: 1,
          pageSize: 10
        },
        page: {
          total: 0
        },
        upload: {
          typeid: ''
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
      // tableRowClassName({row, rowIndex}) {
      //   console.log({row, rowIndex})
      //   if (row.state === 1) {
      //     return 'warning-row';
      //   } else if (rowIndex === 2) {
      //     return 'success-row';
      //   } else if (rowIndex === 2) {
      //     return 'error-row';
      //   }
      //   return '';
      // },
      init() {
        console.log(this.searchData)
        this.loading = true
        let newData = [
          {
            id: 1,
            code: '500元代金券',
            typeid: 1,
            name: '麦小姐',
            phone: '13579246810',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          },
          {
            id: 2,
            code: '500元代金券',
            typeid: 1,
            name: '梁嘉艺',
            phone: '13579246810',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          },
          {
            id: 3,
            code: '欧式沙发',
            typeid: 1,
            name: '康艺彤',
            phone: '13579246810',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          },
          {
            id: 4,
            code: '英式餐桌',
            typeid: 1,
            name: '郭晓生',
            phone: '13579246810',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          },
          {
            id: 5,
            code: '500元代金券',
            typeid: 1,
            name: '陈洁玲',
            phone: '13579246810',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          },
          // {
          //   id: 6,
          //   code: '公仔',
          //   typeid: 3,
          //   name: '溜得滑',
          //   phone: '13579246810',
          //   creatTime: '2019-03-06 09:45:55',
          //   state: 1
          // },
          // {
          //   id: 7,
          //   code: '100元现金券',
          //   typeid: 2,
          //   name: '溜得滑',
          //   phone: '13579246810',
          //   creatTime: '2019-03-06 09:45:55',
          //   state: 1
          // },
          // {
          //   id: 8,
          //   code: '公仔',
          //   typeid: 3,
          //   name: '溜得滑',
          //   phone: '13579246810',
          //   creatTime: '2019-03-06 09:45:55',
          //   state: 1
          // },
          // {
          //   id: 9,
          //   code: '公仔',
          //   typeid: 2,
          //   name: '溜得滑',
          //   phone: '13579246810',
          //   creatTime: '2019-03-06 09:45:55',
          //   state: 1
          // },
          // {
          //   id: 10,
          //   code: '公仔',
          //   typeid: 1,
          //   name: '溜得滑',
          //   phone: '13579246810',
          //   creatTime: '2019-03-06 09:45:55',
          //   state: 1
          // }
        ]
        this.tableData = newData
        this.page.total = newData.length
        setTimeout(() => {
          this.loading = false
        }, 1500)
      },
      selectOptions(id) {
        let name = ''
        this.options.map((item, index, array) => {
          if (item.id === id) {
            name = item.name
          }
        })
        return name
      },
      hanldeSeach() { // 搜索
        this.init()
      },
      hanldeAdd() {  // 添加
        this.$router.push('/ticket/code/add')
      },
      showModal() {
        this.visible = true
      },
      download () {
        location.href = 'http://gzlouvre.globalviewcco.com/file/游戏中奖名单.xls'
        // this.$message.success('下载成功！')
      },
      handleEdit(index, id) {
        this.$message.success('核销成功！')
        this.tableData[index].state = 1
        // this.$router.push('/ticket/code/' + id)
      },
      submitUpload() {
        if (!this.upload.typeid) {
          this.$message.error('请先选择上传的票种类型')
          return false
        }
        this.$refs.upload.submit()
      },
      handleSuccess(data) {
        console.log(data)
        this.visible = false
        this.upload.typeid = ''
        this.$refs.upload.clearFiles()
        // this.form.img = URL.createObjectURL(file.raw)
        // this.form.banner = data.data
      },
      handleDelete(index, id) {
        this.tableData.splice(index, 1)
        this.$message.success('删除成功！')
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
