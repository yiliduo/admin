import request from './request'

function getuploadList(data){
  return request ({
    url: '/admin/xy/upload/list',  
    method:'post',  
    data  
  })
}
function deluploadList(data){
  return request ({
    url: '/admin/xy/upload/del',  
    method:'get',  
    data  
  })
}

function imguploadList(data){
  return request ({
    url: '/admin/xy/upload/uploadImg',  
    method:'post',  
    data  
  })
}

function touploadList(data){
  return request ({
    url: '/admin/xy/upload/updateTitle',  
    method:'post',  
    data  
  })
}
export default{
	getuploadList,
	deluploadList,
	imguploadList,
	touploadList
}