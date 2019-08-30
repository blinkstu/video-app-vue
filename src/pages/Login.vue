<template>
  <div class="page login">
    <div v-if="back" @click="$router.back()" class="back-button">
      <svg-icon icon-class="back"></svg-icon>
    </div>
    <div class="top-block">
      <div class="logo">
        <img src="/static/images/logo.png" alt />
      </div>
    </div>
    <div class="input-block">
      <van-cell-group :border="false">
        <van-field v-model="username" clearable left-icon="contact" placeholder="请输入用户名" />
      </van-cell-group>
    </div>

    <div class="input-block">
      <van-cell-group :border="false">
        <van-field v-model="password" left-icon="lock" type="password" placeholder="请输入密码" />
      </van-cell-group>
    </div>
    <br />
    <div @click="doLogin" class="login-button" :class="{loading:loading}"> <van-loading v-if="loading" color="#932382" type="spinner" size="22px" /> <span v-else>登陆</span></div>
  <br />
    <div class="do-register">
      没有账号？
      <a @click="$router.push('/user/register')" href="javascript:;">立即注册</a>
    </div>
  </div>
</template>

<script>
import { post } from "@/utils/api";
import { Toast } from "vant";

export default {
  data() {
    return {
      username: null,
      password: null,
      device_type: "web",
      loading: false
    };
  },
  props: {
    back: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async doLogin() {
      this.loading = true;
      var result = await post("/video/public/login", {
        username: this.username,
        password: this.password,
        device_type: "web"
      });
      this.loading = false;
      if (result) {
        localStorage.setItem("token", result.data.token);
        await this.$store.dispatch("app/getUserInfo");
        if(this.back){
          this.$router.back()
        }
      }
    }
  },
  mounted() {}
};
</script>