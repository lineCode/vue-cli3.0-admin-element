import xHttp from '@/http/xHttp'
import unit from '@/unit/unit'
export default {
  /**
   * 查询用户
   * @param {查询参数} param 
   */
	queryUser (param) {
    xHttp.getHttp(`/userTab/queryUser?page=${ unit.defaultParam(param.page, '1') }&cuont=${ unit.defaultParam(param.count, '20') }&query_id=${ unit.defaultParam(param.query_id, '') }`, {})
    .then(res => {
      if (res instanceof Object && Object.keys(res).length) {
        window.console.log(res)
      } else {
        window.console.log('没有数据')
      }
    })
  }
}