<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Layout from './components/layout/Layout'
export default {
  name: 'App',
  components: {
    'layout': Layout
  }
}
</script>

<style lang="stylus">
  #app
    width 100%
    height 100%
    padding 0
    margin 0 auto
    background #ffffff

  .index
    h3
      font-size: 56px
      line-height: 160px
      text-align: center
      font-weight: 700
      color: $theme-color
    p
      font-size: 24px
      line-height: 40px
      text-align: center
      a
        color: $theme-color
        padding: 0 20px
        opacity: 0.8
      span
        cursor: pointer
        color: $theme-color
        padding: 0 20px
        opacity: 0.8

  .primary-state
    cursor pointer
    color $theme-color
    padding 0 5px
  .el-menu.el-menu--inline
    background $theme-color!important
  .el-menu-item-group__title
    color #cccccc!important
  .el-menu--popup
    background $theme-color!important
  .el-table th
    color $theme-color !important
  .el-button--primary
    opacity 1
    background-color $theme-color!important
    border-color $theme-color!important
  .el-button--primary:hover
    opacity 0.8
  .el-pagination.is-background .el-pager li:not(.disabled).active
    background $theme-color!important
</style>
