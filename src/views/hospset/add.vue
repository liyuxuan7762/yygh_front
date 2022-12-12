<template>
  <div class="app-container">
    医院设置添加
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import hospSet from '@/api/hospset'

export default {
    data() {
        return {
            hospitalSet : {}
        }
    },
    created() {
        // 获取路由中传递的id值
        // 进行数据的回显
        if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.getHospSet(id)
        } else {
            // 清空表单数据
            this.hospitalSet = {}
        }
    },
    methods : {
        save() {
            hospSet.addHostSet(this.hospitalSet)
            .then(response => {
                // 提示信息
                this.$message({
                  type: 'success',
                  message: '添加成功!'
               })
               // 跳转页面
               this.$router.push({path:'/hospSet/list'})
            })
        },
        update() {
            hospSet.updateHospSet(this.hospitalSet)
            .then(response => {
                // 提示信息
                this.$message({
                  type: 'success',
                  message: '修改成功!'
               })
               // 跳转页面
               this.$router.push({path:'/hospSet/list'})
            })
        },
        saveOrUpdate() {
            if(this.hospitalSet.id) {
                this.update()
            } else {
                this.save()
            }
        },

        // 数据回显
        getHospSet(id) {
            hospSet.getHospSet(id)
                .then(response => {
                    this.hospitalSet = response.data
                })
        }
    }
}
</script>
