<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="searchObj.provinceCode"
          placeholder="请选择省"
          @change="provinceChanged"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="searchObj.cityCode"
          placeholder="请选择市"
          @change="cityChanged"
        >
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="showHospList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="医院logo" align="center">
        <template slot-scope="scope">
          <img
            :src="'data:image/jpeg;base64,' + scope.row.logoData"
            width="80"
          />
        </template>
      </el-table-column>

      <el-table-column prop="hosname" label="医院名称" align="center" />
      <el-table-column prop="param.hostypeName" label="等级" width="90" />
      <el-table-column
        prop="param.fullAddress"
        align="center"
        label="详情地址"
      />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? "未上线" : "已上线" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip placement="top">
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
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="showHospList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import hospitalApi from "@/api/hosp";
export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载 如果正在加载显示小圆圈
      list: null, // 查询到的
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      provinceList: [],
      cityList: [],
    };
  },
  created() {
    this.showHospList(1);
    this.showProvidenceList();
  },
  methods: {
    // 显示全部医院
    showHospList(page = 1) {
      this.page = page;
      hospitalApi
        .getHospList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.content;
          this.total = response.data.totalElements;
          this.listLoading = false;
        });
        
    },
    // 显示所有省份
    showProvidenceList() {
      hospitalApi.getProvinceList().then((response) => {
        this.provinceList = response.data;
      });
    },
    // 页面大小发生变化
    changeSize(size) {
      this.limit = size;
      this.showHospList(1);
    },
    //  清空搜索表单
    resetData() {
      this.searchObj = {};
      showHospList(1);
    },
    // 根据身份查询对应市
    provinceChanged(code) {
      this.cityList = [];
      hospitalApi.getCity(code).then((response) => {
        this.cityList = response.data;
      });
    },
    switchChange($event, id, status) {
      hospitalApi.updateStatus(id, status).then((response) => {
        this.showHospList(this.page);
      });
    },
  },
};
</script>
