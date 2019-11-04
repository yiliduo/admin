export default {
    data(){
        return {
            page: {
                pageSplit:[5,10,15],
                start: 1, //当前页
                limit: 5, // 每页大小
                totalCount: 0, //总数
                totalPage: 0 // 总页数

            }
        }
    }
}