import request from './request'

function getnewList(data){
  return request ({
    url: '/admin/xy/news/list',  
    method:'get',  
    data  
  })
}
function savenewList(data){
  return request ({
    url: '/admin/xy/news/save',  
    method:'post',  
    data  
  })
}
function updatenewList(data){
  return request ({
    url: '/admin/xy/news/update',  
    method:'post',  
    data  
  })
}
function detailenewList(data){
  return request ({
    url: '/admin/xy/news/detail',  
    method:'get',  
    data  
  })
}
function delnewList(data){
  return request ({
    url: '/admin/xy/news/del',  
    method:'get',  
    data  
  })
}
export default{
	getnewList,
	savenewList,
	updatenewList,
	detailenewList,
	delnewList
}