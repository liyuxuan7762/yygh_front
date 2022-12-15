<template>
  <div class="app-container">
    <!-- 表单查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>

    <div>
      <el-button type="danger" size="small" @click="removeRows()"
        >批量删除</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="70" label="序号" />
      <el-table-column prop="hosname" label="医院名称"  />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="250" />
      <el-table-column prop="contactsName" label="联系人姓名"   />
      <el-table-column prop="contactsPhone" label="联系人手机"  width="150" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>
      <el-table-column label="锁定/解锁" width="80">
        <template slot-scope="scope">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="switchChange($event, scope.row.id, scope.row.status)"
            >
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 删除按钮 -->
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >
          </el-button>
          <router-link :to="'/hospSet/edit/' + scope.row.id">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
// 引入接口定义js文件

import hospset from "@/api/hospset";

export default {
  data() {
    return {
      // 定义初始值
      current: 1,
      limit: 5,
      total: 0,
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据的集合 用于接收后端传来的值
      multipleSelection: [], // 数组 用来接收批量删除的id
      value: "0",
    };
  },
  created() {
    // 在页面数据加载前执行
    this.getList();
  },
  methods: {
    getList(page = 1) {
      this.current = page;
      hospset
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
        })
        .catch((error) => {});
    },
    removeDataById(id) {
      this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        //调用接口
        hospset.deleteHospSetById(id).then((response) => {
          //提示
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getList(1);
        });
      });
    },
    // 批量删除
    removeRows() {
      this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        // 遍历selection，从中取出所有的id
        var ids = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        hospset.deleteBatchByIds(ids).then((response) => {
          //提示
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getList(1);
        });
      });
    },

    // 每次点击任意复选框触发该事件
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },

    // 修改状态事件代码
    switchChange($event, id, status) {
      alert(id);
      alert(status);
      hospset.lockHospSet(id, status).then((response) => {
        this.getList(this.current);
      });
    },
  },
};
</script>