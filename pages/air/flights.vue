<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="flightsData" @getDataList="getDataList" />

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
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "../air/flightsListHead.vue";
import FlightsItem from "../air/flightsItem.vue";
import FlightsFilters from "../../components/air/flightsFilters.vue";
import FlightsAside from "../../components/air/flightsAside.vue";

export default {
  data() {
    return {
      // 后台返回的大的数据列表
      flightsData: {
        info: {},
        options: {}
      },

      // 缓存的数据
      cacheFlightsData: {
        info: {},
        options: {}
      },

      // 保存当前显示的列表数据
      dataList: [],

      // 当前页数
      pageIndex: 1,
      // 显示的条数
      pageSize: 8,
      // 总条数
      total: 0
    };
  },

  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  // watch是监听属性，可以监听实例下所有的属性变化 this.xxx
  watch: {
    // 监听路由信息的变化
    $route() {
      // console.log(this.$route)
      // 请求新的数据
      this.pageIndex = 1;
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    //改变分页条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.getDataList();
    },
    //切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.getDataList();
    },
    //对获取分页的数据进行封装
    // getDataList() {
    //   //((index-1)*显示的条数，(index-1)*显示的条数+显示的条数），index是索引值
    //   //slice(从索引值为几开始，显示到第几个)
    //   this.dataList = this.flightsData.flights.slice(
    //     (this.pageIndex - 1) * this.pageSize,
    //     (this.pageIndex - 1) * this.pageSize + this.pageSize
    //   );
    // },
    getData() {
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
        this.total = this.flightsData.flights.length;
        //缓存一份新的列表数据，这个列表不会被修改，而flightsData会被修改，意思是刷有新的数据
        this.cacheFlightsData = { ...res.data };
        this.getDataList();
      });
    },
    //获取分页的数据
    getDataList(arr) {
      //如果有新数据从第一页开始显示
      if (arr) {
        // 替换掉列表数据
        this.flightsData.flights = arr;

        this.total = arr.length;
      }
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
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