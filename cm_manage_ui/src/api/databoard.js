import request from '@/utils/request'

export default {
  /**
  * 测试数据
  * @func getList
  */
  getList: (params) => {
    return request({
      url: '/system/sysUser/list',
      method: 'get',
      params
    })
  }
  
}
