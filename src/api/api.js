import xHttp from '@/http/xHttp'
import unit from '@/unit/unit'
export default {
  /**
   * 查询用户
   * @param {查询参数} param 
   */
	queryUser (param) {
    return new Promise((resolve) => {
      xHttp.getHttp(`User/Index?pageCount=${ unit.defaultParam(param.pageCount, 1) }&pageSize=${ unit.defaultParam(param.pageSize, 20) }&query_name=${ unit.defaultParam(param.query_name, '') }`, {})
      .then(res => {
        resolve(res)
        // if (res instanceof Object && Object.keys(res).length) {
        //   window.console.log(res)
        // } else {
        //   window.console.log('没有数据')
        // }
      })
    })
  }
}