<template>
  <div class="header">
    <div class="main">
      <el-row type="flex" justify="space-between">
        <!-- logo -->
        <div class="logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </div>

        <!-- 菜单 -->
        <el-row type="flex" class="navs">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>

        <!-- 登录注册 -->
        <div v-if="!$store.state.user.userInfo.token">
          <!-- <router-link to="/"></router-link>     -->
          <nuxt-link to="/user/login">登录注册</nuxt-link>
        </div>
        <!-- 登录之后的布局 -->
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
         {{$store.state.user.userInfo.user.nickname}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
  mounted() {
    //   this.nickname=this.$store.state.user.userInfo.user.nickname
    // console.log(1111111111111,this.$store.state.user.userInfo.user.nickname)
  },

  methods: {
      
    handleLogout() {
    //  用户退出
     const commit=this.$store.commit;
     console.log(commit)/
     commit("user/chearUserInfo");
     this.$message({
         message:'退出成功',
         type:'success'
     })
    
    }
  }
};
</script>
<style scoped lang="less">
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;

  .main {
    width: 1000px;
    margin: 0 auto;
  }

  .logo {
    width: 156px;
    padding-top: 8px;

    img {
      display: block;
      width: 100%;
    }
  }

  .navs {
    margin: 0 20px;
    flex: 1;

    a {
      display: block;
      padding: 0 20px;
      height: 60px;
      box-sizing: border-box;

      &:hover,
      &:focus,
      &:active {
        border-bottom: 5px #409eff solid;
        color: #409eff;
      }
    }

    /deep/ .nuxt-link-exact-active {
      background: #409eff;
      color: #fff !important;
    }
  }

  .message {
    height: 36px;
    line-height: 1;
    cursor: pointer;
    .el-icon-bell {
      margin-right: 2px;
      font-size: 18px;
    }
  }

  .el-dropdown-link {
    margin-left: 20px;

    &:hover {
      img {
        border-color: #409eff;
      }
    }

    a {
      display: block;
    }

    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      border: 2px #fff solid;
      border-radius: 50px;
    }
  }

  .account-link {
    font-size: 14px;
    margin-left: 10px;
    color: #666;

    &:hover {
      color: #409eff;
      text-decoration: underline;
    }
  }
}
</style>


