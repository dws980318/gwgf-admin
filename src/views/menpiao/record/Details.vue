<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="渠道商：" prop="distributor">
          <p>{{form.distributor}}</p>
        </el-form-item>
        <el-form-item label="票种类型：" prop="typeid">
          <p>{{SelectOption(form.typeid)}}</p>
        </el-form-item>
        <el-form-item label="订单号：" prop="orderid">
          <p>{{form.orderid}}</p>
        </el-form-item>
        <el-form-item label="订单金额：" prop="price">
          <p><span class="error-state">{{form.price}}</span>元</p>
        </el-form-item>
        <el-form-item label="佣金：" prop="commission">
          <p><span class="error-state">{{form.commission}}</span>元</p>
        </el-form-item>
        <el-form-item label="创建时间："prop="creatTime">
          <p>{{form.creatTime}}</p>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-switch v-model="form.state" :active-value="1" :inactive-value="0" active-text="已结算" inactive-text="未结算"></el-switch>
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
      const checkCommission = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入佣金比例'))
        } else if (value<0||value>20) {
          callback(new Error('请输入正确佣金比例,范围0到20'))
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
        formrules: {},
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
        this.form = {
          id: 10,
          distributor: '广州（天河区）分销点',
          typeid: 2,
          orderid: '1234564654',
          price: 200,
          commission: 10,
          creatTime: '2019-03-06 09:45:55',
          state: 1
        }
      },
      SelectOption(id) {
        let name = ''
        this.options.map((item, index, array) => {
          if (item.id === id) {
            name = item.name
          }
        })
        return name
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
