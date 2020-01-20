<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button type="success" size="small" icon="el-icon-download" @click="download()">导出</el-button>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="searchData.typeid" clearable placeholder="请选择票种类型">
                <el-option v-for="(item, key, index) in options" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-date-picker size="small" v-model="selectDate" type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
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
          <el-table :summary-method="getSummaries" show-summary :data="tableData" border :header-cell-style="{background:'#fafafa'}" v-loading="loading" style="width: 100%">
            <el-table-column label="id" align="center" width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="票种类型" align="center">
              <template slot-scope="scope">
                <span>{{ selectOptions(scope.row.typeid) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sum" label="门票数量（张）" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.sum }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sell" label="已售门票（张）" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.sell }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="已售总额（元）" align="center">
              <template slot-scope="scope">
                <p><span class="error-state">{{ scope.row.price }}</span></p>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="库存（张）" align="center">
              <template slot-scope="scope">
                <span class="error-state">{{ scope.row.total }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="80"
              align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.state===1?'success-state':''||scope.row.state===0?'error-state':''">{{ state_list[scope.row.state] }}</span>
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
            name: '国际汽车展览会1'
          }, {
            id: 2,
            name: '国际汽车展览会2'
          }, {
            id: 3,
            name: '国际汽车展览会3'
          }, {
            id: 4,
            name: '国际汽车展览会4'
          }, {
            id: 5,
            name: '国际汽车展览会5'
          }
        ],
        state_list: {
          1: '已上架',
          0: '已下架'
        },
        tableData: [],// 用于存放数据
        selectDate: [],
        searchData: {
          startDate: '',
          endDate: '',
          name: '',
          typeid: '',
          state: '',
          currentPage: 1,
          pageSize: 10
        },
        page: {
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
      init(searchData) {
        this.loading = true
        let newData = [
          {
            id: 1,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 1
          },
          {
            id: 2,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 1
          },
          {
            id: 3,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 1
          },
          {
            id: 1,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 1
          },
          {
            id: 2,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 1
          },
          {
            id: 3,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 0
          },
          {
            id: 1,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 0
          },
          {
            id: 2,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 1
          },
          {
            id: 3,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 0
          },
          {
            id: 1,
            typeid: 2,
            sum: 998,
            sell: 830,
            total: 168,
            price: 41500,
            creatTime: '2019-08-01 12:48:32',
            state: 0
          }
        ]
        this.tableData = newData
        this.page.total = newData.length
        setTimeout(() => {
          this.loading = false
        }, 1500)
      },
      hanldeSeach() { // 搜索
        this.init(this.searchData)
      },
      hanldeAdd() {  // 添加
        this.$router.push('/project/add')
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
      handleEdit(index, id) {
        this.$router.push('/project/' + id)
      },
      handleDelete(index, id) {
        this.tableData.splice(index, 1)
      },
      handleSizeChange(val) {
        this.page.currpage = 1
        this.page.pageSize = val
        this.init()
      },
      handleCurrentChange(val) {
        this.page.currpage = val
        this.init()
      }
    }
  }
</script>

<style scoped>
  .warning-state{
    color: #e3853a;
  }
  .success-state{
    color: #67C23A;
  }
  .error-state{
    color: #F56C6C;
    padding: 0 5px;
  }
</style>
