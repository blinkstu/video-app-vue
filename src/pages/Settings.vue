<template>
  <div class="page settings">
    <van-nav-bar left-arrow @click-left="$router.back()" title="用户设定" />
    <br />
    <van-cell-group>
      <van-cell @click="doLogout" is-link>退出登陆</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {Toast} from 'vant';
import { post } from "@/utils/api";
export default {
  data() {
    return {};
  },
  methods: {
    async doLogout(){
      var result = await post('/video/public/logout')
      if(result){
        Toast('退出成功！')
        localStorage.removeItem('token')
        this.$store.state.app.userInfo = null;
        this.$router.push('/my')
      }
    }
  }
};
</script>