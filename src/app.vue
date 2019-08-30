<template>
  <!-- App -->
  <div class="page" style="overflow:hidden;">
    <!-- Main View -->
    <transition :name="transitionName">
      <keep-alive :include="include">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<style scoped>
.center {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
.ig {
  -webkit-animation: circle 1.5s infinite linear;
}
@-webkit-keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
import { isMobile } from 'mobile-device-detect';
import { Toast } from "vant";
export default {
  name: "App",
  data() {
    return {
      include: ["Main"],
      transitionName: null,
      url: "/",
      show: false
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Login") {
        this.transitionName = "van-fade";
        return false;
      }
      if (from.name == "Login") {
        this.transitionName = "van-fade";
        return false;
      }
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "tab-right" : "tab-left";
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      if (from.meta.keepAlive && toDepth < fromDepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  },
  async created() {
    if(!isMobile){
      const el = document.body;
      el.classList.add('desktop');
    }
    var token = localStorage.getItem("token");
    if (token) {
      const loginToast = Toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner"
      });
      var result = await this.$store.dispatch("app/getUserInfo");
      loginToast.clear();
      if (result) {
        this.show = true;
      } else {
        localStorage.removeItem("token");
        this.show = true;
      }
    }
  }
};
</script>
