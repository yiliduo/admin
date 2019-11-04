import axios from 'axios'

function getMovieList(data) {
  var url = 'http://59.110.138.169/api/douban/movie/top250';
  return axios.get(url); //返回promise
}

export default {
    getMovieList
}
