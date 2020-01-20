<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical-demo" :unique-opened="true" :default-active="currentMenu" :collapse="isCollapse"
             :router="true">
<!--      <el-menu-item index="/">-->
<!--        <i class="el-icon-house"></i>-->
<!--        <span slot="title">首页</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/info">
        <i class="el-icon-user"></i>
        <span slot="title">个人账户</span>
      </el-menu-item>
      <el-submenu index="/account">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span slot="title">账号管理</span>
        </template>
        <el-menu-item-group>
          <span slot="title">账号管理</span>
          <el-menu-item index="/account/admin">管理员账号管理</el-menu-item>
          <el-menu-item index="/account/teacher">老师账号管理</el-menu-item>
          <el-menu-item index="/account/student">学生账号管理</el-menu-item>
<!--          <el-menu-item index="/account/general">普通用户账号管理</el-menu-item>-->
<!--          <el-menu-item index="/account/role">角色管理</el-menu-item>-->
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/notice">
        <i class="el-icon-bell"></i>
        <span slot="title">通知管理</span>
      </el-menu-item>
<!--      <el-submenu index="/basic">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-folder-opened"></i>-->
<!--          <span slot="title">基本信息管理</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <span slot="title">基本信息管理</span>-->
<!--          <el-menu-item index="/basic/college">学院管理</el-menu-item>-->
<!--          <el-menu-item index="/basic/department">系部管理</el-menu-item>-->
<!--          <el-menu-item index="/basic/major">专业管理</el-menu-item>-->
<!--          <el-menu-item index="/basic/direction">专业方向设置</el-menu-item>-->
<!--          <el-menu-item index="/basic/grade">年级/学制设置</el-menu-item>-->
<!--          <el-menu-item index="/basic/teacher">教师基础信息设置</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
      <el-menu-item index="/course">
        <i class="el-icon-reading"></i>
        <span slot="title">课程教学管理</span>
      </el-menu-item>
      <el-menu-item index="/activity">
        <i class="el-icon-coordinate"></i>
        <span slot="title">专业竞赛部项目管理</span>
      </el-menu-item>
<!--      <el-submenu index="/course">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-reading"></i>-->
<!--          <span slot="title">课程教学管理</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <span slot="title">课程教学管理</span>-->
<!--          <el-menu-item index="/course/class">课程分类管理</el-menu-item>-->
<!--          <el-menu-item index="/course/store">课程库管理</el-menu-item>-->
<!--          <el-menu-item index="/course/record">课程审核</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="/activity">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-coordinate"></i>-->
<!--          <span slot="title">专业竞赛部项目管理</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <span slot="title">专业竞赛部项目管理</span>-->
<!--          <el-menu-item index="/activity/second">第二课堂活动</el-menu-item>-->
<!--          <el-menu-item index="/activity/community">社会服务活动</el-menu-item>-->
<!--          <el-menu-item index="/activity/competition">竞赛活动</el-menu-item>-->
<!--          <el-menu-item index="/activity/other">其他活动</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-menu-item index="/living">-->
<!--        <i class="el-icon-data-board"></i>-->
<!--        <span slot="title">课程直播管理</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/blogroll">
        <i class="el-icon-suitcase"></i>
        <span slot="title">精品资源导航管理</span>
      </el-menu-item>
      <el-submenu index="/logs">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span slot="title">日志管理</span>
        </template>
        <el-menu-item-group>
          <span slot="title">日志管理</span>
          <el-menu-item index="/logs/system">系统日志</el-menu-item>
          <el-menu-item index="/logs/login">登录日志</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "SideBar",
    props: ['isCollapse'],
    data() {
      return {
        currentMenu: '/'
      }
    },
    watch: {
      '$route.path'(val, oldVal) {
        if(val && val !== oldVal) {
          this.currentMenu = sessionStorage.getItem('path')
          this.getUrl()
        }
      }
    },
    created() {
      this.getUrl();
    },
    methods: {
      // 设置导航初始化
      getUrl() {
        if (this.$route.matched.length > 3) {
          this.currentMenu = this.$route.matched[2].path
        } else {
          this.currentMenu = this.$route.matched[1].path
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-menu
    background $theme-color
  .el-menu-item, .el-submenu__title
    color #ffffff
    i
      color #ffffff
  .el-menu-item.is-active
    opacity-color(0.5)
    color $theme-color

  .el-menu-item.is-active,.el-menu-item:hover, .el-menu-item:focus, .el-submenu__title:hover *
    color $theme-color!important
    i
      color $theme-color
  .el-submenu
    .el-menu
     background $theme-color!important
  .el-submenu__title *
    color #ffffff!important
  .el-menu-item-group
    background rgba(0,0,0,.05)
    .el-menu-item-group__title
      color #fafafa!important
</style>
