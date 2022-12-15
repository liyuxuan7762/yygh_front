import request from '@/utils/request'

export default {
  // 获取医院列表
  getHospList(page, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospital/list/${page}/${limit}`,
      method : "get",
      params : searchObj
    }) 
  },
  // 获取省份列表
  getProvinceList() {
    return request({
      url : `/admin/cmn/dict/providenceList`,
      method: "get"
    }) 
  },
  // 根据省份查询对应市
  getCity(code) {
    return request({
      url : `/admin/cmn/dict/getCity/${code}`,
      method : "get"
    })
  },
  // 更新医院状态
  updateStatus(id, code) {
    return request({
      url : `/admin/hosp/hospital/updateStatus/${id}/${code}`,
      method : "get"
    }) 
  } 
}

