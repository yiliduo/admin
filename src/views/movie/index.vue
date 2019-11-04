<template>
  <div class="movie-main">
    <h2>这是index.vue页面</h2>
    <el-card class="movie-card" shadow="never">
      <div slot="header">
        <span>电影列表</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import MovieApi from "@/api/movie";
export default {
  name: "Movie",

  data() {
    return {
      movieList: [],
       tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  created() {
    this.getMovieList();
  },
  methods: {
    getMovieList() {
      MovieApi.getMovieList().then(res => {
        this.movieList = res.data.data;
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.movie-main {
  .movie-card {
    margin: 30px;
  }
}
</style>
