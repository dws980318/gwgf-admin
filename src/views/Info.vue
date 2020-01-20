<template>
  <div class="info">
    <h3>基本信息</h3>
    <div class="form">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.avatar" :src="form.avatar" class="avatar">
            <el-avatar :size="80" v-else> user</el-avatar>
            <div class="el-upload__tip" slot="tip">点击图片上传头像，只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号名称">
          <el-input prefix-icon="el-icon-user" type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input prefix-icon="el-icon-bank-card" type="text" v-model="form.account"></el-input>
          <input style="position: fixed; bottom: -9999px; z-index: -999">
        </el-form-item>
        <el-form-item label="密码">
          <input style="position: fixed; bottom: -9999px; z-index: -999" type="password">
          <el-input
            v-model="form.password"
            maxlength="16"
            auto-complete="new-password"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属系部">
          <el-select v-model="form.department" placeholder="请选择所属系部">
            <el-option label="影视艺术系" :value="1"></el-option>
            <el-option label="外语系" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input prefix-icon="el-icon-mobile" type="text" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input prefix-icon="el-icon-message" type="text" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import avatar from '../common/images/avatar.jpg'

  export default {
    name: "Info",
    data() {
      return {
        form: {
          avatar: avatar,
          name: '超级管理员',
          account: 'admin',
          password: 'admin',
          phone: '13579246810',
          email: '987654321@qq.com',
          sex: 2,
          department: 2
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 350px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    display: block;
  }
</style>
