<template>
  <div class="index">
    <div class="index_left">
      <div class="function">
        <div class="fun_item" :style="{background: item.background}" v-for="(item, index) in function_list" :key="index"
             @click="$router.push(item.router)">
          <div class="fun_icon"><i :class="item.icon"></i></div>
          <p>{{item.name}}</p>
        </div>
      </div>
      <div class="log">
        <el-table
          :data="logData"
          :header-cell-style="{background:'#fafafa'}"
          border
          v-loading="loading"
          style="width: 100%"
          :stripe="true">
          <el-table-column
            prop="name"
            label="日志名称">
          </el-table-column>
          <el-table-column
            prop="user"
            label="用户名称">
          </el-table-column>
          <el-table-column
            prop="class"
            label="类名"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="controller"
            label="方法名"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="creattime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="information"
            label="具体消息"
            :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
      </div>
      <div class="act">
        <el-table
          :data="actData"
          :header-cell-style="{background:'#fafafa'}"
          border
          v-loading="loading"
          style="width: 100%"
          :stripe="true">
          <el-table-column
            prop="name"
            label="数据名称">
          </el-table-column>
          <el-table-column
            prop="user"
            label="参与院系数量">
          </el-table-column>
          <el-table-column
            prop="class"
            label="参与总人数">
          </el-table-column>
          <el-table-column
            prop="controller"
            label="活动地点">
          </el-table-column>
          <el-table-column
            prop="creattime"
            label="持续时间">
          </el-table-column>
          <el-table-column
            prop="information"
            label="花费金额"
            :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="index_right">
      <div class="canlendar">
        <div class="calendar-wrapper" :style="{content: current.date}">
          <div class="can_bg"><p>{{ current.date }}</p></div>
          <div class="calendar-toolbar">
            <div class="prev" @click="prevMonth"><i class="el-icon-arrow-left"></i></div>
            <div class="current">{{ currentDateStr }}</div>
            <div class="next" @click="nextMonth"><i class="el-icon-arrow-right"></i></div>
          </div>
          <div class="calendar-week">
            <div class="week-item" v-for="item of weekList" :key="item">{{ item }}</div>
          </div>
          <div class="calendar-inner">
            <div class="calendar-item" v-for="(item, index) of calendarList" :key="index"
                 :class="[{'disabled': item.disable},{'current': item.cur}]">
              {{ item.date }}
            </div>
          </div>
        </div>
      </div>
      <div class="notice">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发布通知</span>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="收件人" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择收件人">
                <el-option label="王小虎" value="1"></el-option>
                <el-option label="王二虎" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="正文" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        loading: true,
        function_list: [
          {
            icon: 'el-icon-document-copy',
            name: '账户管理',
            router: '/account/admin',
            background: '#fcc105'
          },
          {
            icon: 'el-icon-data-board',
            name: '课程直播管理',
            router: '/living',
            background: '#fa8562'
          },
          {
            icon: 'el-icon-suitcase',
            name: '精品资源导航管理',
            router: '/blogroll',
            background: '#c785b5'
          },
          {
            icon: 'el-icon-s-operation',
            name: '系统设置',
            router: '/settings/logs',
            background: '#61ace3'
          }
        ],
        logData: [
          {
            name: '登录日志',
            user: '王小虎',
            class: 'LoginClass',
            controller: 'LoginController',
            creattime: '2019-11-27',
            information: '登录IP：192.132.5.11'
          },
          {
            name: '登录日志',
            user: '王小虎',
            class: 'LoginClass',
            controller: 'LoginController',
            creattime: '2019-11-27',
            information: '登录IP：192.132.5.11'
          },
          {
            name: '登录日志',
            user: '王小虎',
            class: 'LoginClass',
            controller: 'LoginController',
            creattime: '2019-11-27',
            information: '登录IP：192.132.5.11'
          },
          {
            name: '登录日志',
            user: '王小虎',
            class: 'LoginClass',
            controller: 'LoginController',
            creattime: '2019-11-27',
            information: '登录IP：192.132.5.11'
          },
          {
            name: '登录日志',
            user: '王小虎',
            class: 'LoginClass',
            controller: 'LoginController',
            creattime: '2019-11-27',
            information: '登录IP：192.132.5.11'
          },
        ],
        actData: [
          {
            name: '第二课堂活动',
            user: '5',
            class: '3000',
            controller: '艺术学院小剧场',
            creattime: '3天',
            information: '10000'
          },
          {
            name: '第二课堂活动',
            user: '5',
            class: '3000',
            controller: '艺术学院小剧场',
            creattime: '3天',
            information: '10000'
          },
          {
            name: '第二课堂活动',
            user: '5',
            class: '3000',
            controller: '艺术学院小剧场',
            creattime: '3天',
            information: '10000'
          },
          {
            name: '第二课堂活动',
            user: '5',
            class: '3000',
            controller: '艺术学院小剧场',
            creattime: '3天',
            information: '10000'
          },
          {
            name: '第二课堂活动',
            user: '5',
            class: '3000',
            controller: '艺术学院小剧场',
            creattime: '3天',
            information: '10000'
          },
        ],
        weekList: ['一', '二', '三', '四', '五', '六', '日'],
        current: {},   // 当前时间
        calendarList: [],  // 用于遍历显示
        shareDate: new Date(), // 享元模式，用来做优化的
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 2, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择收件人', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请填写正文内容', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      // 显示当前时间
      currentDateStr() {
        let {year, month} = this.current;
        return `${year}年${this.pad(month + 1)}月`;
      },
      lunarDetail() {
        return sloarToLunar(this.year, this.month.toString().padStart(2, '0'), this.today);
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.setCurrent();
        this.calendarCreator();
        this.loading = false
      },
      logout() {
        console.log('退出登录')
      },
      // 判断当前月有多少天
      getDaysByMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
      },
      getFirstDayByMonths(year, month) {
        return new Date(year, month, 1).getDay();
      },
      getLastDayByMonth(year, month) {
        return new Date(year, month + 1, 0).getDay();
      },
      // 对小于 10 的数字，前面补 0
      pad(str) {
        return str < 10 ? `0${str}` : str;
      },
      // 点击上一月
      prevMonth() {
        this.current.month--;
        // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
        this.correctCurrent();
        // 生成新日期
        this.calendarCreator();
      },
      // 点击下一月
      nextMonth() {
        this.current.month++;
        // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
        this.correctCurrent();
        // 生成新日期
        this.calendarCreator();
      },
      // 格式化时间，与主逻辑无关
      stringify(year, month, date) {
        let str = [year, this.pad(month + 1), this.pad(date)].join('-');
        return str;
      },
      // 设置或初始化 current
      setCurrent(d = new Date()) {
        let year = d.getFullYear();
        let month = d.getMonth();
        let date = d.getDate();
        this.current = {
          year,
          month,
          date
        }
      },
      // 修正 current
      correctCurrent() {
        let {year, month, date} = this.current;

        let maxDate = this.getDaysByMonth(year, month);
        // 预防其他月跳转到2月，2月最多只有29天，没有30-31
        date = Math.min(maxDate, date);

        let instance = new Date(year, month, date);
        this.setCurrent(instance);
      },
      // 生成日期
      calendarCreator() {
        // 一天有多少毫秒
        const oneDayMS = 24 * 60 * 60 * 1000;

        let list = [];
        let {year, month} = this.current;

        // 当前月份第一天是星期几, 0-6
        let firstDay = this.getFirstDayByMonths(year, month);
        // 填充多少天
        let prefixDaysLen = firstDay === 0 ? 6 : firstDay - 1;
        // 毫秒数
        let begin = new Date(year, month, 1).getTime() - oneDayMS * prefixDaysLen;

        // 当前月份最后一天是星期几, 0-6
        let lastDay = this.getLastDayByMonth(year, month);
        // 填充多少天， 和星期的排放顺序有关
        let suffixDaysLen = lastDay === 0 ? 0 : 7 - lastDay;
        // 毫秒数
        let end = new Date(year, month + 1, 0).getTime() + oneDayMS * suffixDaysLen;
        while (begin <= end) {
          // 享元模式，避免重复 new Date
          this.shareDate.setTime(begin);
          let year = this.shareDate.getFullYear();
          let curMonth = this.shareDate.getMonth();
          let date = this.shareDate.getDate();
          // let thisMonth = new Date().getMonth();
          let cur = false
          // console.log(new Date(year + '-' + ( curMonth + 1 > 10 ? curMonth + 1:'0' + curMonth + 1 ) + '-' + (date > 10 ? date:'0' + date)), new Date())
          if (year === new Date().getFullYear() && curMonth === new Date().getMonth() && date === new Date().getDate()) {
            cur = true
          }
          // console.log(cur)
          list.push({
            year: year,
            month: curMonth,
            date: date,
            cur,
            disable: curMonth !== month,
            value: this.stringify(year, curMonth, date)
          });
          begin += oneDayMS;
        }

        this.calendarList = list;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message.success('发布成功')
            this.ruleForm = {}
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .index {
    min-width 1500px
  }

  .index_left {
    float left
    width 960px

    .function {
      flex-col-center()
      justify-content space-between
      width 100%
      padding 15px 0

      .fun_item {
        cursor pointer
        flex-ver-center()
        width 210px
        height 150px
        border-radius 10px
        box-shadow 2px 2px 15px #cccccc

        div {
          text-align center

          i {
            font-size 56px
            color #ffffff
            line-height 75px
          }
        }

        p {
          font-size 18px
          color #ffffff
        }
      }
    }

    .log, .act {
      padding 15px 0
    }
  }

  .index_right {
    float left
    width 450px
    margin-left 30px

    .canlendar {
      padding 15px 0
    }

    .notice {
      width 420px
    }
  }

  .calendar-wrapper {
    position relative
    z-index 2
    width: 420px;
    /*height: 400px;*/
    overflow: hidden;
    box-shadow 1px 1px 10px #e0e0e0
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    border-radius 3px

    .can_bg {
      content ''
      flex-center()
      position absolute
      z-index 1
      top 0
      left 0
      width 100%
      height 100%

      p {
        font-size 240px
        font-family '方正琥珀简体'

        color dodgerblue
        opacity 0.5
      }
    }
  }

  .calendar-toolbar {
    flex-col-center()
    position relative
    z-index 5
    width: 420px;
    height 50px
    margin: 0 auto;
    text-align: center;
  }

  .calendar-toolbar .current {
    flex: 1;
    height 100%
    line-height 50px
  }

  .prev, .next {
    cursor pointer
    width 60px
    height 100%
    line-height 50px
  }

  .prev:hover, .next:hover {
    background $theme-color
    color #ffffff
  }

  .calendar-week {
    display: flex;
    margin-top: 10px;
    text-align: center;
  }

  .calendar-week .week-item {
    flex: 1;
    height 50px
    line-height 50px
  }

  .calendar-item {
    position relative
    z-index 99
    cursor pointer
    float: left;
    width: 60px;
    height: 60px;
    font-size 16px
    line-height: 60px;
    text-align: center;
  }

  .calendar-item.current {
    background dodgerblue
    color #ffffff
  }

  .calendar-item:hover {
    background $theme-color
    color #ffffff
  }

  .calendar-item.disabled {
    cursor auto
    color: #ccc;
  }

  .calendar-item.disabled:hover {
    background none;
    color: #ccc;
  }

  .calendar-item.checked {
    color: red;
  }

</style>
