<template>
  <div class="login">
    <div class="login_panel">
      <!--      <p class="title">后台管理系统</p>-->
      <div class="main">
        <div class="form_item">
          <div class="item_icon"><i class="el-icon-user"></i></div>
          <input type="text" autocomplete="new-password" placeholder="请输入用户名">
        </div>
        <div class="form_item">
          <div class="item_icon"><i class="el-icon-unlock"></i></div>
          <input type="password" autocomplete="new-password" placeholder="请输入密码">
        </div>
        <div class="form_item">
          <button @click="login()">立即登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {}
    },
    methods: {
      login() {
        this.$store.commit('setLogin', true)
        this.$router.replace('/')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .login {
    position relative
    width 100%
    height 100%
    background-image '../common/images/login.jpg'

    .login_panel {
      position-center()
      width 640px
      height 520px
      box-shadow 0 2px 25px #fff
      border-radius 10px
      background #152a87
    }

    .title {
      position absolute
      top -100px
      width 100%
      font-size 48px
      font-weight bold
      font-family '方正胖头鱼简体'
      -webkit-text-stroke 2px #fff
      color $theme-color
      text-align center
    }

    .main {
      width 100%
      height 100%
      padding 80px

      .form_item {
        flex-col-center()
        width 100%
        height 60px
        box-shadow 0 0 5px dodgerblue
        border-radius 3px
        overflow hidden
        margin 45px 0

        .item_icon {
          width 70px
          height 60px
          text-align center
          background dodgerblue

          i {
            font-size 32px
            color #ffffff
            line-height 60px
          }
        }

        input {
          flex 1
          height 100%
          background transparent
          outline none
          border none
          padding 0 30px
          font-size 18px
          color #ffffff

          &::placeholder {
            color dodgerblue
          }
        }

        button {
          cursor pointer
          flex 1
          height 100%
          border-radius 3px
          background dodgerblue
          border none
          font-size 20px
          color #ffffff
        }
      }
    }
  }
</style>
