<template>
  <div class="page bookmark">
    <van-nav-bar title="我的收藏"></van-nav-bar>
    <div class="no-login" v-if="!show">
      <div class="login-button" @click="$router.push({ name: 'Login', params: {back: true }})">登陆</div>
      <span>登陆后即可查看</span>
    </div>
    <div class="content" v-if="show">
      <div class="text-align-center width-100 block" style="margin-top: 30vh;">
        <svg-icon class="text-color-gray" icon-class="storage" style="width:6em;height:6em;"></svg-icon>
        <p class="text-color-gray text-align-center">暂无收藏记录~</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    storeUserInfo() {
      return this.$store.state.app.userInfo;
    }
  },
  watch: {
    storeUserInfo(val) {
      if (val) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  mounted() {
    var userInfo = this.$store.state.app.userInfo;
    if (userInfo) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
};
</script>