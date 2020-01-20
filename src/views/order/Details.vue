<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="游戏名称：" prop="code">
          <el-input size="small" v-model="form.code" placeholder="请输入游戏名称"></el-input>
        </el-form-item>
        <el-form-item label="游戏链接：" prop="orderid">
          <el-input type="text" size="small" v-model="form.orderid" placeholder="请输入游戏链接"></el-input>
        </el-form-item>
        <el-form-item v-if="form.id" label="创建时间："prop="creatTime">
          <p>{{form.creatTime}}</p>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-switch v-model="form.state" :active-value="1" :inactive-value="0" active-text="已启用" inactive-text="已禁止"></el-switch>
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
        },
        form: {
          state: 0
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
          code: '拆红包',
          orderid: 'http://llffgg.com/game/pack',
          creatTime: '2019-08-01 12:48:32',
          state: 1
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
