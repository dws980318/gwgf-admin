<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="奖项名称：" prop="name">
          <el-input size="small" v-model="form.name" placeholder="请输入奖项名称"></el-input>
        </el-form-item>
        <el-form-item label="奖项图片：" prop="banner">
          <el-upload
            class="upload-demo"
            drag
            :limit="1"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            action="https://jsonplaceholder.typicode.com/posts/">
            <el-tooltip v-if="form.banner" :content="form.banner" placement="top">
              <img :src="form.banner" class="img">
            </el-tooltip>
            <div v-else>
              <i class="el-icon-upload"></i>
            </div>
            <div class="el-upload__text">将封面图拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="游戏名称：" prop="typeid">
          <el-select size="small" v-model="form.game" placeholder="请选择游戏">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖品等级：" prop="price">
          <el-input type="text" size="small" v-model="form.price" placeholder="请输入奖品等级"></el-input>
        </el-form-item>
        <el-form-item label="奖品库存：" prop="total">
          <el-input type="text" size="small" v-model="form.total" placeholder="请输入奖品库存"></el-input>
        </el-form-item>
        <el-form-item label="概率：" prop="commission">
          <el-input type="number" size="small" v-model="form.commission" placeholder="请输入概率"><template slot="append">%</template></el-input>
        </el-form-item>
        <el-form-item label="奖项说明：" prop="place">
          <el-input style="width: 90%" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" resize="none" show-word-limit v-model="form.place" placeholder="请输入奖项说明"></el-input>
        </el-form-item>
        <el-form-item v-if="form.id" label="创建时间："prop="creatTime">
          <p>{{form.creatTime}}</p>
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
            name: '拆红包'
          },
          // {
          //   id: 2,
          //   name: '转轮盘'
          // }, {
          //   id: 3,
          //   name: '刮刮乐'
          // }
        ],
        formrules: {

        },
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
          if(id == 1) {
            this.form = {
              id: 1,
              name: '欧式沙发',
              banner: '',
              game: 1,
              price: '一等奖',
              total: 5,
              commission: 30,
              creatTime: '2019-03-06 09:45:55',
              place: '1.asdas',
            }
          } else if (id == 2) {
            this.form = {
              id: 2,
              name: '英式餐桌',
              banner: '',
              game: 1,
              price: '二等奖',
              total: 2,
              commission: 10,
              creatTime: '2019-03-06 09:45:55',
              place: '1.asdas',
            }
          } else if (id == 3) {
            this.form = {
              id: 3,
              name: '500元代金券',
              banner: '',
              game: 1,
              price: '三等奖',
              total: 3,
              commission: 20,
              creatTime: '2019-03-06 09:45:55',
              place: '1.asdas',
            }
          }

      },
      beforeUpload(file) {
        // const isJPG = file.distributor === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        //
        // if (!isJPG) {
        //   this.$message.error('上传图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      handleExceed() {
        this.$message.error('只能上传一张图片')
      },
      handleSuccess(data) {
        // this.form.img = URL.createObjectURL(file.raw)
        this.form.banner = data.data
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
