<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="门票识别码：" prop="code">
          <el-input size="small" v-model="form.code" placeholder="请输入门票识别码"></el-input>
        </el-form-item>
        <el-form-item label="票种类型：" prop="typeid">
          <el-select size="small" v-model="form.typeid" placeholder="请选择票种类型">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.id" label="创建时间："prop="creatTime">
          <p>{{form.creatTime}}</p>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-switch v-model="form.state" :active-value="1" :inactive-value="0" active-text="已售出" inactive-text="未售出"></el-switch>
        </el-form-item>
        <el-form-item label="订单号：" prop="orderid">
          <el-input type="text" size="small" v-model="form.orderid" placeholder="请输入订单号"></el-input>
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
      const checkOrderid = (rule, value, callback) => {
        if (Boolean(this.form.state)) {
          if(!value) {
            callback(new Error('请输入订单号'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
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
        formrules: {
          code: [
            { required: true, message: '请输入门票识别码', trigger: 'blur' }
          ],
          typeid: [
            { required: true, message: '请选择票种类型', trigger: 'blur' }
          ],
          orderid: [
            { required: false, validator: checkOrderid, trigger: 'blur' }
          ]
        },
        form: {
          state: 0
        }
      }
    },
    watch: {
      'form.state'(val, oldVal) {
        if(val && Boolean(val)) {
          this.formrules.orderid[0].required = true
        } else {
          this.formrules.orderid[0].required = false
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
        this.form = {
          id: id,
          code: '1354652132',
          typeid: 2,
          creatTime: '2019-03-06 09:45:55',
          orderid: '',
          state: 0
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
</style>
