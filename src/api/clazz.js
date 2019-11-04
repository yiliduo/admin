// 引入封装好的axios
import request from './request'

//获取用户列表
function getClassList(data){
  return request ({
    url: '/admin/xy/clazz/list',  
    method:'get',  
    data  
  })
}
function saveClassList(data){
  return request ({
    url: '/admin/xy/clazz/save',  
    method:'post',  
    data  
  })
}
function updateClassList(data){
  return request ({
    url: '/admin/xy/clazz/update',  
    method:'post',  
    data  
  })
}
function detailClassList(data){
  return request ({
    url: '/admin/xy/clazz/detail',  
    method:'get',  
    data  
  })
}
function removeClassList(data){
  return request ({
    url: '/admin/xy/clazz/del',  
    method:'get',  
    data  
  })
}

export default {
    getClassList,
	saveClassList,
	updateClassList,
	detailClassList,
	removeClassList
}