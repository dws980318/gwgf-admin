<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="专业">
          <el-select v-model="form.major" placeholder="请选择专业">
            <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级描述">
          <el-input type="text" v-model="form.name" placeholder="请输入年级描述"></el-input>
        </el-form-item>
        <el-form-item label="学制">
          <el-input-number v-model="form.year" :min="1" :max="10" label="学制"></el-input-number>
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
            name: '文化与传播'
          },
          {
            id: 2,
            name: '经济学'
          },
          {
            id: 3,
            name: '国际会展与旅游'
          }
        ],
        formrules: {},
        form: {
          year: 1,
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
          major: 1,
          name: '大一至大四',
          year: 4,
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
