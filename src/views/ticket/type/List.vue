<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button type="warning" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-input size="small" v-model="searchData.name" placeholder="奖项名称"></el-input>
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
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="奖项图片" align="center" width="260">
              <template slot-scope="scope">
                <img class="preview" :src="scope.row.banner" alt="">
              </template>
            </el-table-column>
            <el-table-column label="游戏名称" align="center">
              <template slot-scope="scope">
                <p><span>{{ scope.row.price }}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="奖品等级" align="center">
              <template slot-scope="scope">
                <p><span>{{ scope.row.total }}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="库存" align="center">
              <template slot-scope="scope">
                <p><span class="error-state">{{ scope.row.limit }}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="概率" align="center">
              <template slot-scope="scope">
                <p><span class="error-state">{{ scope.row.commission }}</span>%</p>
              </template>
            </el-table-column>
            <el-table-column label="奖品说明" align="center">
              <template slot-scope="scope">
                <p><span>{{ scope.row.place }}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
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
  // import desk from '@/common/images/desk.png'
  // import money from '@/common/images/money.png'
  // import safa from '@/common/images/safa.png'
  export default {
    name: "List",
    data() {
      return {
        view_index: 0,
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
          1: '已上架',
          0: '已下架'
        },
        // state_list: {
        //   1: '申请入住',
        //   2: '已入住',
        //   3: '已搬离'
        // },
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
        }
      }
    },
    watch: {
      selectDate(val, oldVal) {
        if (val) {
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
            name: '欧式沙发',
            banner: '',
            price: '拆红包',
            total: '一等奖',
            limit: 5,
            commission: 30,
            creatTime: '2019-03-06 09:45:55',
            place: '1.asdas',
          },
          {
            id: 2,
            name: '英式餐桌',
            banner: '',
            price: '拆红包',
            total: '二等奖',
            limit: 2,
            commission: 10,
            creatTime: '2019-03-06 09:45:55',
            place: '1.asdas',
          },
          {
            id: 3,
            name: '500元代金券',
            banner: '',
            price: '拆红包',
            total: '三等奖',
            limit: 3,
            commission: 20,
            creatTime: '2019-03-06 09:45:55',
            place: '1.asdas',
          },
          // {
          //   id: 4,
          //   name: '100元现金券',
          //   banner: banner,
          //   price: '抢红包',
          //   total: '一等奖',
          //   limit: 5,
          //   commission: 50,
          //   creatTime: '2019-03-06 09:45:55',
          //   place: '1.asdas',
          // },
          // {
          //   id: 5,
          //   name: '公仔',
          //   banner: banner,
          //   price: '刮刮乐',
          //   total: '三等奖',
          //   limit: 5,
          //   commission: 20,
          //   creatTime: '2019-03-06 09:45:55',
          //   place: '1.asdas',
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
      hanldeAdd() {  // 添加
        this.$router.push('/ticket/type/add')
      },
      showModal(index) {
        this.view_index = index
        this.visible = true
      },
      handleEdit(index, id) {
        this.$router.push('/ticket/type/' + id)
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
