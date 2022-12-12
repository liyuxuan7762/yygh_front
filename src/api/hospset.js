import request from '@/utils/request'

export default {
  getHospSetList(current, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  deleteHospSetById(id) {
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: "delete"
    })
  },
  // 批量删除
  deleteBatchByIds(idList) {
    return request({
      url: "/admin/hosp/hospitalSet/batchDelete",
      method: "delete",
      data: idList
    })
  },

  // 修改医院设置属性
  lockHospSet(id, status) {
    return request({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put'
    })
  },

  // 添加医院信息
  addHostSet(hospSet) {
    return request({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hospSet
    })
  },

  // 修改回显
  getHospSet(id) {
    return request({
      url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
      method: "get",
    })
  },

  // 修改医院设置
  updateHospSet(hospSet) {
    return request({
      url: `/admin/hosp/hospitalSet/updateHospSet`,
      method: 'post',
      data: hospSet
    })
  }

}
