<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="角色">
          <el-input prefix-icon="el-icon-user" type="text" v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-tree
            :data="allRole"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            :default-checked-keys="form.role">
          </el-tree>
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
        formrules: {},
        form: {
          role: [1, 2, 3, 4, 5, 6, 7, 8],
          state: 1
        },
        allRole: [
          {
            id: 1,
            label: '账户管理',
            children: [
              {
                id: 9,
                label: '管理员账号管理',
              },
              {
                id: 10,
                label: '老师账号管理',
              },
              {
                id: 11,
                label: '学生账号管理',
              },
              {
                id: 12,
                label: '普通用户账户管理',
              },
              {
                id: 13,
                label: '角色管理',
              }
            ]
          },
          {
            id: 2,
            label: '通知管理'
          },
          {
            id: 3,
            label: '基本信息管理',
            children: [
              {
                id: 14,
                label: '专业方向设置'
              },
              {
                id: 15,
                label: '年级/学制设置'
              },
              {
                id: 16,
                label: '教师基础信息设置'
              }
            ]
          },
          {
            id: 4,
            label: '专业及课程管理',
            children: [
              {
                id: 17,
                label: '专业管理'
              },
              {
                id: 18,
                label: '课程分类管理'
              },
              {
                id: 19,
                label: '课程库管理'
              },
              {
                id: 20,
                label: '课程审核'
              }
            ]
          },
          {
            id: 5,
            label: '活动管理',
            children: [
              {
                id: 21,
                label: '第二课堂活动'
              },
              {
                id: 22,
                label: '社会服务活动'
              },
              {
                id: 23,
                label: '竞赛活动'
              },
              {
                id: 24,
                label: '其他活动'
              }
            ]
          },
          {
            id: 6,
            label: '课程直播管理'
          },
          {
            id: 7,
            label: '精品资源导航管理'
          },
          {
            id: 8,
            label: '系统管理',
            children: [
              {
                id: 25,
                label: '日志管理'
              },
              {
                id: 26,
                label: '系统配置'
              },
              {
                id: 27,
                label: '数据报表'
              },
              {
                id: 28,
                label: '数据备份'
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
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
          name: '管理员',
          role: [1, 2, 3, 4, 5, 6, 7],
          creatTime: '2019-03-06 09:45:55',
          state: 1
        }
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      dialogFormEdit() {
        this.$refs['checkForm'].validate((valid) => {
          if (valid) {
            // if (this.form.id) {
            //
            // } else {
            //
            // }
            console.log(this.$refs.tree.getCheckedKeys());
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
