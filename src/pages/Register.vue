<template>
  <div class="page register">
    <van-nav-bar left-arrow @click-left="$router.back()" title="注册" />
    <br />
    <br />
    <van-cell-group>
      <van-field v-model="username" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button :disabled="codeLoading" @click="getVerifyCoce" slot="button" size="small" type="primary">
          <van-loading v-if="codeLoading" color="white" type="spinner" size="12px" />
          <span v-else>发送验证码</span>
        </van-button>
      </van-field>
      <van-field v-model="nickname" label="昵称" placeholder="请输入昵称" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
      <van-field v-model="re_password" type="password" label="重复密码" placeholder="请重复密码" />
    </van-cell-group>
    <br />
    <div @click="doRegister" class="login-button">注册</div>
  </div>
</template>

<script>
import { post, get } from "@/utils/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: null,
      sms: null,
      nickname: null,
      password: null,
      re_password: null,
      codeLoading: false,
      invite_code: null
    };
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    async getVerifyCoce() {
      this.codeLoading = true;
      var result = await get("/video/verification_code/send", {
        username: this.username
      });
      this.codeLoading = false;
      if (result) {
        Toast(result.msg);
      }
    },
    async doRegister() {
      if (this.password !== this.re_password) {
        Toast("重复密码不一致！");
        return false;
      }
      var result = await get("/video/public/register", {
        username: this.username,
        verification_code: this.sms,
        password: this.password,
        nickname: this.nickname,
        invite_code: this.invite_code
      });
      if (result) {
        Toast("注册成功！");
        localStorage.setItem("token", result.data.token);
        await this.$store.dispatch("app/getUserInfo");
        this.$router.push("/my");
      }
    }
  },
  mounted() {
    var invite_code = this.getQueryVariable('ic');
    if(invite_code){
      this.invite_code = invite_code
    }
  },
};
</script>