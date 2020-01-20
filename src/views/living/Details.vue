<template>
  <div class="details">
    <el-page-header @back="goBack" content="新增"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="课程标题">
          <el-input type="text" v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="直播人">
          <el-select v-model="form.sex" placeholder="请选择收件人">
            <el-option label="张三" :value="1"></el-option>
            <el-option label="李四" :value="2"></el-option>
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
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      dialogFormEdit() {
        this.$refs['checkForm'].validate((valid) => {
          if (valid) {
            // if (this.form.id) {
            //
            // } else {
            //
            // }
            this.$message.success('新增成功')
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
