<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button type="warning" size="small" icon="el-icon-plus" @click="hanldeAdd">新增</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-input size="small" v-model="searchData.name" placeholder="请输入游戏名称"></el-input>
            </el-form-item>
<!--            <el-form-item>-->
<!--              <el-select size="small" v-model="searchData.distributorid" clearable placeholder="请选择渠道商">-->
<!--                <el-option v-for="(item, key, index) in distributors" :key="index" :label="item.name"-->
<!--                           :value="item.id"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-select size="small" v-model="searchData.typeid" clearable placeholder="请选择票种类型">-->
<!--                <el-option v-for="(item, key, index) in options" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
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
          <el-table :data="tableData" border :header-cell-style="{background:'#fafafa'}" v-loading="loading" style="width: 100%">
            <el-table-column label="id" align="center" width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="游戏名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.orderid }}</span>
              </template>
            </el-table-column>
            <el-table-column label="游戏链接" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
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
        distributors: [
          {
            id: 1,
            name: '广州（天河区）分销点'
          }
        ],
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
          typeid: '',
          state: '',
          distributorid: '',
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
      init(searchData) {
        this.loading = true
        let newData = [
          {
            id: 1,
            orderid: '拆红包',
            name: 'http://llffgg.com/game/pack',
            creatTime: '2019-08-01 12:48:32',
            state: 1
          },
          // {
          //   id: 2,
          //   orderid: '轮盘抽奖',
          //   name: 'http://llffgg.com/game/circle',
          //   creatTime: '2019-08-01 12:48:32',
          //   state: 1
          // },
          // {
          //   id: 3,
          //   orderid: '刮刮乐',
          //   name: 'http://llffgg.com/game/card',
          //   creatTime: '2019-08-01 12:48:32',
          //   state: 1
          // }
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
        this.$router.push('/game/add')
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
      showModal(content) {
        this.content = content
        this.visible = true
      },
      handleEdit(index, id) {
        this.$router.push('/game/' + id)
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
