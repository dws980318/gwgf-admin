<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button type="warning" size="small" icon="el-icon-plus" @click="handleAdd()">新增</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-input size="small" v-model="searchData.name" placeholder="门票名称"></el-input>
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
            <el-table-column label="id" align="center" width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="礼券名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.distributor }}</span>
              </template>
            </el-table-column>
            <el-table-column label="礼券库存" align="center" prop="total">
              <template slot-scope="scope">
                <p><span class="error-state">{{ scope.row.total }}</span></p>
              </template>
            </el-table-column>
<!--            <el-table-column label="有效期（天）" align="center" prop="clear">-->
<!--              <template slot-scope="scope">-->
<!--                <p><span class="error-state">{{ scope.row.clear }}</span></p>-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column label="礼券说明" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.content }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="80"
              align="center">
              <template slot-scope="scope">
                <span :class="scope.row.state===1?'success-state':''||scope.row.state===0?'error-state':''">{{ state_list[scope.row.state] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160px" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
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
          1: '已启用',
          0: '已禁用'
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
            distributor: '欧式家居展会门票',
            total: 998,
            clear: 30,
            content: '这是欧式家居展会门票的说明。',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          },
          // {
          //   id: 2,
          //   distributor: '50元现金券',
          //   total: 998,
          //   clear: 30,
          //   content: '这是礼券的说明。',
          //   creatTime: '2019-03-06 09:45:55',
          //   state: 1
          // },
          // {
          //   id: 3,
          //   distributor: '200元现金券',
          //   total: 998,
          //   clear: 30,
          //   content: '这是礼券的说明。',
          //   creatTime: '2019-03-06 09:45:55',
          //   state: 0
          // }
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
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          const values = data.map(item => Number(item[column.property]))

          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            // sums[index] += ' 元'
          } else {
            sums[index] = 'N/A'
          }
        });

        return sums;
      },
      handleAdd() {
        this.$router.push('/menpiao/distributor/add')
      },
      handleEdit(index, id) {
        this.$router.push('/menpiao/distributor/' + id)
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
