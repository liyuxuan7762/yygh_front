import request from '@/utils/request'

export default {
  getHospSetList(current, limit, searchObj) {
    return request({
      url : `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method : 'post',
      data : searchObj
    })
  },
  deleteHospSetById(id) {
    return request({
      url : `/admin/hosp/hospitalSet/${id}`,
      method : "delete"
    })
  },
  // 批量删除
  deleteBatchByIds(idList) {
    return request({
      url : "/admin/hosp/hospitalSet/batchDelete",
      method : "delete",
      data : idList
    })
  }
}
