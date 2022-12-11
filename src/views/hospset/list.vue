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
        >查询</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
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
      @current-change="fetchData"
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
      limit: 3,
      total: 0,
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据的集合 用于接收后端传来的值
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
  },
};
</script>