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
    <div @click="doLogin" class="login-button">登陆</div>
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
      device_type: "web"
    };
  },
  props: {
    back: {
      type: Boolean
    }
  },
  methods: {
    async doLogin() {
      var toast = Toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner"
      });
      var result = await post("/video/public/login", {
        username: this.username,
        password: this.password,
        device_type: "web"
      });
      toast.clear();
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