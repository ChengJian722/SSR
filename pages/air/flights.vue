<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[4, 8, 12, 16]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "../air/flightsListHead.vue";
import FlightsItem from "../air/flightsItem.vue";

export default {
  data() {
    return {
      // 后台返回的大的数据列表
      flightsData: {},
      //定义一个空数组
      dataList: [],
      //总条数
      total:10,
      //显示的条数
      pageSize:5,
      //当前页数
      pageIndex:1,
    };
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  mounted() {
    //请求列表数据
    this.$axios({
      url: "/airs",
      method: "GET",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      //保存总的大数据
      this.flightsData = res.data;
      //把数据渲染到页面，dataList有一个返回值，跟结构里的遍历有联系
      this.dataList = this.flightsData.flights;
      //总页数
      this.total=this.flightsData.flights.length;
    });
  },
  methods:{
    //改变分页条数时触发
    handleSizeChange(value){
      this.pageSize=value;
      this.getDataList()
    },
    //切换页数时触发
    handleCurrentChange(value){
      this.pageIndex=value;
      this.getDataList()
    },
    //对获取分页的数据进行封装
    getDataList(){
      //((index-1)*显示的条数，(index-1)*显示的条数+显示的条数），index是索引值
      //slice(从索引值为几开始，显示到第几个)
      this.dataList=this.flightsData.flights.slice(
        (this.pageIndex-1)*this.pageSize,
        (this.pageIndex-1)*this.pageSize+this.pageSize
      );
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>