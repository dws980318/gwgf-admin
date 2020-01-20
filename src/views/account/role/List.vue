<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button type="success" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
            </el-form-item>
            <el-form-item label-width="50">
              <el-button type="danger" size="small" icon="el-icon-delete" @click="hanldeSomeDelete()">批量删除</el-button>
            </el-form-item>
            <!--            <el-form-item label-width="50">-->
            <!--              <el-button type="warning" size="small" icon="el-icon-download" @click="download()">导出</el-button>-->
            <!--            </el-form-item>-->
            <el-form-item label="">
              <el-input size="small" v-model="searchData.name" placeholder="请输入角色名称"></el-input>
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
                    v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>
            <!--            <el-table-column label="id" align="center" width="60">-->
            <!--              <template slot-scope="scope">-->
            <!--                <span>{{ scope.row.id }}</span>-->
            <!--              </template>-->
            <!--            </el-table-column>-->
            <el-table-column label="角色" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="权限" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.role }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <span v-if="Boolean(scope.row.state)" class="success-state">启用</span>
                <span v-else class="error-state">禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160px" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
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
            name: '影视艺术系'
          },
          {
            id: 2,
            name: '外语系'
          }
        ],
        formrules: {},
        state_list: {
          1: '启用',
          0: '禁用'
        },
        selection: [],
        tableData: [],// 用于存放数据
        selectDate: [],
        searchData: {
          startDate: '',
          endDate: '',
          name: '',
          state: '',
          department: '',
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
    computed: {

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
            name: '管理员',
            role: '全部权限',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          },
          {
            id: 2,
            name: '教师',
            role: '通知管理、课程管理、在线答疑、作业管理、学生情况、直播室管理、活动管理、账户管理',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          },
          {
            id: 3,
            name: '学生',
            role: '个人信息、在线学习、账户管理、学习工具',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          },
          {
            id: 4,
            name: '普通用户',
            role: '无',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          }
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
        this.$router.push('/account/role/add')
      },
      showModal() {
        this.visible = true
      },
      download () {
        location.href = 'http://gzlouvre.globalviewcco.com/file/游戏中奖名单.xls'
        // this.$message.success('下载成功！')
      },
      getOptions(department) {
        for(let i = 0; i < this.options.length; i++ ){
          if(this.options[i].id == department){
            return this.options[i].name
          }
        }
        return '加载所属系部错误'
      },
      handleEdit(index, id) {
        // this.$message.success('核销成功！')
        // this.tableData[index].state = 1
        this.$router.push('/account/role/' + id)
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
      },
      handleSelectionChange(val) {
        this.selection = val;
      },
      hanldeSomeDelete() {
        this.selection.map(item => {
          if(this.tableData.indexOf(item) != -1) {
            this.tableData.splice(this.tableData.indexOf(item), 1)
          }
        })
        this.$message.success('批量删除成功')
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
