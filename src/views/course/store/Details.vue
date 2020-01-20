<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="课程名称">
          <el-input type="text" v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="分类选择">
          <el-select v-model="form.send" placeholder="请选择分类">
            <el-option label="语言文化类" :value="1"></el-option>
            <el-option label="经济管理类" :value="2"></el-option>
          </el-select>
          <el-select v-model="form.review" placeholder="请选择专业">
            <el-option label="文化与传播" :value="1"></el-option>
            <el-option label="国际会展与旅游" :value="2"></el-option>
            <el-option label="语言信息管理" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任课老师">
          <el-select v-model="form.teacher" placeholder="请选择任课老师">
            <el-option label="张三" :value="1"></el-option>
            <el-option label="李四" :value="2"></el-option>
            <el-option label="王五" :value="3"></el-option>
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
      this.init()
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      init(id) {
        this.form = {
          id: id,
          name: '中华五千年文化',
          send: 2,
          review: 2,
          teacher: 2,
          creatTime: '2019-03-06 09:45:55',
          state: 1
        }
      },
      dialogFormEdit() {
        this.$refs['checkForm'].validate((valid) => {
          if (valid) {
            console.log(this.form)
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
