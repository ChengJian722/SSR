<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //到达城市
        deatCode: "", //到达城市代码
        departDate: "" //出发时间
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$alert("暂时不支持往返", "提示", { type: "warning" });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    // cb：回调函数，必须要调用，接收的参数格式是固定的,必须是一个数组，数组中每一项必须是一个对象
    // 对象中必须包含value属性
    //如果value为空值时，cb回调为空，不再执行，如果有值就发起请求
    queryDepartSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        const serchArr = [];

        //   console.log(data)
        //遍历是为了输入一个关键字是，能显示有关的机场
        data.forEach(v => {
          v.value = v.name.replace("市", "");
          serchArr.push(v);
        //   console.log(v);
        });
        //设置第一个为选中的默认值
        // this.form.departCity=serchArr[0].value;
        // this.form.departCode=serchArr[0].sort;
        cb(serchArr);
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        const serchArr = [];

        //   console.log(data)
        //遍历是为了输入一个关键字是，能显示有关的机场
        data.forEach(v => {
          v.value = v.name.replace("市", "");
          serchArr.push(v);
        //   console.log(v);
        });
        //设置第一个为选中的默认值
        // this.form.departCity=serchArr[0].value;
        // this.form.departCode=serchArr[0].sort;
        cb(serchArr);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      //赋值给出发城市
      this.form.departCity = item.value;
      //赋值给出发城市的代码
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      //赋值给到达城市
    //   console.log(item.value);
      this.form.departCity = item.value;
    //   console.log(this.form.departCity);
      //赋值给到达城市的代码
      this.form.departCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
        this.form.departDate=moment(value).format("YYYY-MM-DD")
    },

    // 触发和目标城市切换时触发
    handleReverse() {
        //交换出发地和到达地只要换它们的城市名和城市代码
        const {departCity,departCode,destCity,destCode}=this.form;

        this.form.departCity=destCity;
        this.form.departCode=destCode;

        this.form.destCity=departCity;
        this.form.deatCode=departCode;
    },

    // 提交表单是触发
    handleSubmit() {
        //判断
        if(!this.form.departCity){
            this.$alert("出发地址不能为空","提示",{
                type:'warning'
            })
            return
        }
        if(!this.form.departCity){
            this.$alert("到达地址不能为空","提示",{
                type:'warning'
            })
            return
        }
        if(!this.form.departCity){
            this.$alert("出发时间不能为空","提示",{
                type:'warning'
            })
            return
        }
        //跳转的机票列表页
        this.$router.push({
            path:'/air/flights',
            query:this.form,
        })
    }
  },

  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>