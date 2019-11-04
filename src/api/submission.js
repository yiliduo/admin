// 引入封装好的axios
import request from './request'

//获取用户列表
function submissions(data){
  return request ({
    url: '/admin/xy/student/save',  //相对路径
    method:'post',  // get/post
    data  // 固定写法
  })
}

export default {
    submissions
}