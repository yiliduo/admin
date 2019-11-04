// 引入封装好的axios
import request from './request'

//执行登录
function doLogin(data) {
  return request({
    url: '/admin/login/doLogin', //相对路径
    method: 'post', // get/post
    data // 固定写法
  })
}

//获取用户明细
function getUserInfo(data) {
  return request({
    url: '/admin/login/getUserInfo', //相对路径
    method: 'post', // get/post
    data // 固定写法
  })
}

function doLogOut(data) {
  return request({
    url: '/admin/login/doLogOut',
    method: 'get',
    data
  })
}



export default {
  doLogin,
  getUserInfo,
  doLogOut
}
