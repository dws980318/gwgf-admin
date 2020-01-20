<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="账号名称">
          <el-input prefix-icon="el-icon-user" type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input prefix-icon="el-icon-bank-card" type="text" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            maxlength="16"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属系部">
          <el-select v-model="form.sex" placeholder="请选择所属系部">
            <el-option label="影视艺术系" :value="1"></el-option>
            <el-option label="外语系" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input prefix-icon="el-icon-mobile" type="text" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input prefix-icon="el-icon-message" type="text" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.state"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="dialogFormEdit()">确 定</el-button>
          <el-button size="small" @click="$router.back()">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Details",
    data() {
      return {
        options: [
          {
            id: 1,
            name: '影视艺术系'
          }, {
            id: 2,
            name: '外语系'
          }
        ],
        formrules: {

        },
        form: {
          sex: 1,
          state: 1
        }
      }
    },
    watch: {

    },
    created() {
      if(this.$route.params.id) {
        this.init(this.$route.params.id)
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      init(id) {
        this.form = {
          id: id,
          name: '超级管理员',
          account: 'admin',
          phone: '13579246810',
          email: '987654321@qq.com',
          sex: 2,
          department: 2,
          creatTime: '2019-03-06 09:45:55',
          state: 1
        }
      },
      dialogFormEdit() {
        this.$refs['checkForm'].validate((valid) => {
          if (valid) {
            // if (this.form.id) {
            //
            // } else {
            //
            // }
            this.$message.success(this.form.id?'编辑成功！':'新增成功')
            this.$router.back()
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .el-input{
    width: 350px;
  }
</style>
