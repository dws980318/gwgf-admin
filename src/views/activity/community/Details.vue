<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="活动名称">
          <el-input type="text" v-model="form.name" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="报名时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="form.apply1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">——</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="form.apply2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择活动日期" v-model="form.actDate" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="text-align: center">-</el-col>
          <el-col :span="7">
            <el-time-picker placeholder="选择开始时间" value-format="HH:mm:ss" v-model="form.actTime1" style="width: 100%;"></el-time-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">——</el-col>
          <el-col :span="7">
            <el-time-picker placeholder="选择结束时间" value-format="HH:mm:ss" v-model="form.actTime2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input type="text" v-model="form.address" placeholder="请输入活动地点"></el-input>
        </el-form-item>
        <el-form-item label="举办部门">
          <el-input type="text" v-model="form.department" placeholder="请输入举办部门"></el-input>
        </el-form-item>
        <el-form-item label="报名人数">
          <el-input-number v-model="form.num" :min="1" label="报名人数"></el-input-number>
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
          num: 1,
          hour: 1,
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
          name: '奥运冠军分享后',
          apply1: '2019-12-24',
          apply2: '2019-12-31',
          actDate: '2019-01-01',
          actTime1: '07:00:00',
          actTime2: '09:30:00',
          address: '艺术学院小剧场',
          department: '艺术部门',
          num: 30,
          hour: 2,
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
