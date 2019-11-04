const TokenKey = 'BUFAN-TEC'

export function getToken() {
    // 字符串类型
  var res = localStorage.getItem(TokenKey);
  if(res){
      res = JSON.parse(res);
  }else{
      res = undefined;
  }
  return res;
}

export function setToken(obj) {
    // setItem 必须是字符串
    localStorage.setItem(TokenKey,JSON.stringify(obj));
}

export function removeToken() {
  localStorage.removeItem(TokenKey);
}
