// 引入封装好的axios
import request from './request'

//获取用户列表
function getDormList(data){
  return request ({
    url: '/admin/xy/dorm/list',  
    method:'get',  
    data  
  })
}
function saveDormList(data){
  return request ({
    url: '/admin/xy/dorm/save',  
    method:'post',  
    data  
  })
}
function updateDormList(data){
  return request ({
    url: '/admin/xy/dorm/update',  
    method:'post',  
    data  
  })
}
function detailDormList(data){
  return request ({
    url: '/admin/xy/dorm/detail',  
    method:'get',  
    data  
  })
}

function removeDormList(data){
  return request ({
    url: '/admin/xy/dorm/del',  
    method:'get',  
    data  
  })
}
export default {
  getDormList,
	saveDormList,
	updateDormList,
	detailDormList,
	removeDormList
}