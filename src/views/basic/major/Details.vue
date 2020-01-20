<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="专业代码">
          <el-input type="text" v-model="form.number" placeholder="请输入专业代码"></el-input>
        </el-form-item>
        <el-form-item label="专业名称">
          <el-input type="text" v-model="form.name" placeholder="请输入专业名称"></el-input>
        </el-form-item>
        <el-form-item label="所属院系">
          <el-select v-model="form.college" placeholder="请选择所属院系">
            <el-option label="英语语言文化学院" :value="1"></el-option>
            <el-option label="经济贸易学院" :value="2"></el-option>
          </el-select>
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
        formrules: {},
        form: {
          sex: 1,
          state: 1
        }
      }
    },
    watch: {},
    created() {
      if (this.$route.params.id) {
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
          number: '12345',
          college: 1,
          name: '文化与传播',
          creatTime: '2019-11-29 10:26:14',
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
            this.$message.success(this.form.id ? '编辑成功！' : '新增成功')
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
  .el-input {
    width: 350px;
  }
</style>
