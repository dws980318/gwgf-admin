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
              <el-button type="danger" size="small" icon="el-icon-delete" @click="hanldeSomeDelete()">批量停播</el-button>
            </el-form-item>
<!--            <el-form-item label-width="50">-->
<!--              <el-button type="warning" size="small" icon="el-icon-download" @click="download()">导出</el-button>-->
<!--            </el-form-item>-->
            <el-form-item label="">
              <el-input size="small" v-model="searchData.name" placeholder="请输入课程标题"></el-input>
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
            <el-table-column label="课程标题" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="直播人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.send }}</span>
              </template>
            </el-table-column>
            <el-table-column label="开播时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <span v-if="Boolean(scope.row.state)" class="success-state">直播中</span>
                <span v-else class="error-state">已下播</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200px" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="location.href='https://baidu.com'">查看直播间</el-button>
                <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row.id)">停播</el-button>
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
        formrules: {},
        state_list: {
          1: '直播中',
          0: '已下播'
        },
        selection: [],
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
            title: '视频剪辑与制作',
            send: '张三',
            review: '李四',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          },
          {
            id: 2,
            title: '视频剪辑与制作',
            send: '张三',
            review: '李四',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          },
          {
            id: 3,
            title: '视频剪辑与制作',
            send: '张三',
            review: '李四',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          },
          {
            id: 4,
            title: '视频剪辑与制作',
            send: '张三',
            review: '李四',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          },
          {
            id: 5,
            title: '视频剪辑与制作',
            send: '张三',
            review: '李四',
            creatTime: '2019-03-06 09:45:55',
            state: 1
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
        this.$router.push('/living/add')
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
        if(this.tableData[index].state === 1) {
          this.$message.success('停播成功！')
          this.tableData[index].state = 0
        }
        // else if(this.tableData[index].state === 0) {
        //   this.$message.success('上架成功！')
        //   this.tableData[index].state = 1
        // }
        // this.$router.push('/account/teacher/' + id)
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
            // this.tableData.splice(this.tableData.indexOf(item), 1)
            item.state = 0
          }
        })
        this.$message.success('批量停播成功！')
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
