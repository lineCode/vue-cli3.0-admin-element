import xHttp from '@/http/xHttp'
import unit from '@/unit/unit'
export default {
  getPubKey () {
    return new Promise((resolve) => {
      xHttp.getHttp(`Index/rsaCrypt`, {})
      .then(res => {
        resolve(res)
      })
    })
  },
  login (param) {
    return new Promise((resolve) => {
      xHttp.postHttp(`Index/login`, param)
      .then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 查询用户信息
   * @param {查询参数} param 
   */
	queryUser (param, header) {
    return new Promise((resolve) => {
      xHttp.getHttp(`User/getUser?pageCount=${ unit.defaultParam(param.pageCount, 1) }&pageSize=${ unit.defaultParam(param.pageSize, 20) }&queryName=${ unit.defaultParam(param.queryName, '') }`, header)
      .then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 添加用户信息
   * @param {添加参数 username password name status} param 
   */
  updateUser (param) {
    return new Promise((resolve) => {
      xHttp.postHttp(`User/updateUser`, param)
      .then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 删除用户信息
   * @param {删除参数 id ,} param 
   */
  deleteUser (param) {
    return new Promise((resolve) => {
      xHttp.postHttp(`User/deleteUser`, param)
      .then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 查询用户信息
   * @param {查询参数} param 
   */
	querySuggest (param, header) {
    return new Promise((resolve) => {
      xHttp.getHttp(`Suggest/getSuggest?pageCount=${ unit.defaultParam(param.pageCount, 1) }&pageSize=${ unit.defaultParam(param.pageSize, 20) }&queryCode=${ unit.defaultParam(param.queryCode, '') }`, header)
      .then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 添加用户信息
   * @param {添加参数 username password name status} param 
   */
  updateSuggest (param) {
    return new Promise((resolve) => {
      xHttp.postHttp(`Suggest/updateSuggest`, param)
      .then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 删除用户信息
   * @param {删除参数 id ,} param 
   */
  deleteSuggest (param) {
    return new Promise((resolve) => {
      xHttp.postHttp(`Suggest/deleteSuggest`, param)
      .then(res => {
        resolve(res)
      })
    })
  },
}