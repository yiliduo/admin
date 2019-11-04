// 引入封装好的axios
import request from './request'

//获取用户列表
function getStudentList(data){
  return request ({
    url: '/admin/xy/student/list',  //相对路径
    method:'get',  // get/post
    data  // 固定写法
  })
}
function saveStudent(data){
	return request ({
	  url: '/admin/xy/student/save',  //相对路径
	  method:'post',  // get/post
	  data  // 固定写法
	})
}
function updateStudent(data){
	return request ({
	  url: '/admin/xy/student/update',  //相对路径
	  method:'post',  // get/post
	  data  // 固定写法
	})
}
function detailStudent(data){
	return request ({
	  url: '/admin/xy/student/detail',  //相对路径
	  method:'get',  // get/post
	  data  // 固定写法
	})
}

function removeStudent(data){
	return request ({
	  url: '/admin/xy/student/del',  //相对路径
	  method:'get',  // get/post
	  data  // 固定写法
	})
}
function payStudent(data){
	return request ({
	  url: '/admin/xy/cost/list',  //相对路径
	  method:'get',  // get/post
	  data  // 固定写法
	})
}
export default {
    getStudentList,
		saveStudent,
		updateStudent,
		detailStudent,
		removeStudent,
		payStudent
}