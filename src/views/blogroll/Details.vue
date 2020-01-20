<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id ? '编辑' : '新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="标题">
          <el-input type="text" v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="教学类型">
          <el-select v-model="form.type" placeholder="请选择教学类型">
            <el-option label="视频讲课" :value="1"></el-option>
            <el-option label="普通教学" :value="2"></el-option>
            <el-option label="实践教学" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL">
          <el-input type="text" v-model="form.url" placeholder="请输入URL"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择发布时间" v-model="form.time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :file-list="form.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">通知附件列表</div>
          </el-upload>
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
          time: '',
          fileList: [],
          state: 1
        }
      }
    },
    watch: {

    },
    created() {
      if(this.$route.params.id) {
        this.init()
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      init() {
        this.form = {
            id: 1,
            name: '学术全文数据库',
            type: 2,
            time: '2020-01-01',
            url: 'http://baidu.com',
            // textarea: '中华大词库',
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            state: 1
        }
      },
      handlePreview(file) {
        window.open(this.downloadfileUrl + file.url)
      },
      handleRemove(file, fileList) {
        this.$message.success('移除附件成功！')
      },
      dialogFormEdit() {
        this.$refs['checkForm'].validate((valid) => {
          if (valid) {
            if (this.form.id) {
              this.$message.success('编辑成功')
            } else {
              this.$message.success('新增成功')
            }
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
