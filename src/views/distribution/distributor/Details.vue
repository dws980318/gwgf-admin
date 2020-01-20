<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="礼券名称：" prop="distributor">
          <el-input size="small" v-model="form.distributor" placeholder="请输入礼券名称"></el-input>
        </el-form-item>
        <el-form-item label="礼券库存：" prop="total">
          <el-input type="number" size="small" v-model="form.total" placeholder="请输入礼券库存"></el-input>
        </el-form-item>
        <el-form-item label="有效期：" prop="clear">
          <el-input type="number" size="small" v-model="form.clear" placeholder="请输入有效期"><template slot="append">天</template></el-input>
        </el-form-item>
        <el-form-item label="礼券说明：" prop="place">
          <el-input style="width: 90%" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" resize="none" show-word-limit v-model="form.place" placeholder="请输入礼券说明"></el-input>
        </el-form-item>
        <el-form-item v-if="form.id" label="创建时间："prop="creatTime">
          <p>{{form.creatTime}}</p>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-switch v-model="form.state" :active-value="1" :inactive-value="0" active-text="已启用" inactive-text="已禁用"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-left: 150px">
        <el-button size="small" type="primary" @click="dialogFormEdit('formEdit')">确 定</el-button>
        <el-button size="small" @click="$router.back()">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Details",
    data() {
      const isMobilePhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
      const isFixMob = /^1[34578]\d{9}$/
      const checkPhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入固定电话或手机号码，固定电话格式：区号-号码'))
        } else if (!isFixMob.test(value) && !isMobilePhone.test(value)) {
          callback(new Error('请输入正确电话号码或手机号码，固定电话格式：区号-号码'))
        } else {
          callback()
        }
      }
      return {
        formrules: {
          // distributor: [
          //   { required: true, message: '请输入渠道商名称', trigger: 'blur' }
          // ],
          // name: [
          //   { required: true, message: '请输入姓名', trigger: 'blur' }
          // ],
          // phone: [
          //   { required: true, validator: checkPhone, trigger: 'change' }
          // ]
        },
        form: {
          state: 0
        }
      }
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
        if(id == 1) {
          this.form = {
            id: 1,
            distributor: '100元现金券',
            total: 998,
            clear: 30,
            place: '这是礼券的说明。',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          }
        } else if (id == 2) {
          this.form = {
            id: 2,
            distributor: '50元现金券',
            total: 998,
            clear: 30,
            place: '这是礼券的说明。',
            creatTime: '2019-03-06 09:45:55',
            state: 1
          }
        } else if (id == 3) {
          this.form = {
            id: 3,
            distributor: '200元现金券',
            total: 998,
            clear: 30,
            place: '这是礼券的说明。',
            creatTime: '2019-03-06 09:45:55',
            state: 0
          }
        }
      },
      dialogFormEdit() {
        this.$refs['checkForm'].validate((valid) => {
          if (valid) {
            console.log(this.form)
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
  .error-state{
    color: orangered;
    padding: 0 5px;
  }
</style>
