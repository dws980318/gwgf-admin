<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="分类名称">
          <el-input type="text" v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-transfer
            filterable
            :titles="['所有专业', '已选专业']"
            :props="{key: 'id', label: 'name'}"
            :filter-method="filterMethod"
            filter-placeholder="请输入专业名称"
            v-model="form.send"
            :data="major">
          </el-transfer>
        </el-form-item>
        <el-form-item label="正文">
          <el-input type="textarea" v-model="form.name" placeholder="请输入正文内容"></el-input>
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
          send: [],
          state: 1
        },
        major: [
          {
            id: 1,
            name: '语言信息管理'
          },
          {
            id: 2,
            name: '国际会展与旅游'
          },
          {
            id: 3,
            name: '文化与传播'
          }
        ],
        filterMethod(query, item) {
          return item.name.indexOf(query) > -1;
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
          name: '教师',
          account: 'teacher',
          password: 'teacher',
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
            console.log(this.form);
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
