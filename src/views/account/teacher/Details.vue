<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">

        <el-form-item label="用户名">
          <el-input prefix-icon="el-icon-bank-card" type="text" v-model="form.account" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input prefix-icon="el-icon-user" type="text" v-model="form.name" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input prefix-icon="el-icon-mobile" type="text" v-model="form.phone" placeholder="请输入联系方式（邮件/电话号码）"></el-input>
        </el-form-item>
        <el-form-item label="国籍">
          <el-select v-model="form.nationality" placeholder="请选择国籍">
            <el-option label="中国" :value="1"></el-option>
            <el-option label="美国" :value="2"></el-option>
            <el-option label="日本" :value="3"></el-option>
            <el-option label="英国" :value="4"></el-option>
            <el-option label="德国" :value="5"></el-option>
            <el-option label="韩国" :value="6"></el-option>
            <el-option label="巴西" :value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在中心">
          <el-input prefix-icon="el-icon-mobile" type="text" v-model="form.department" placeholder="请输入所在中心"></el-input>
        </el-form-item>
        <el-form-item label="研究方向">
          <el-input prefix-icon="el-icon-mobile" type="text" v-model="form.study" placeholder="请输入研究方向"></el-input>
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
          name: '赵子龙',
          account: 'teacher',
          phone: '987654321@qq.com',
          email: '987654321@qq.com',
          sex: 1,
          nationality: 1,
          department: '生物研究中心',
          study: '基因工程',
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
