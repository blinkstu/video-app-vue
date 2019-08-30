import Vue from "vue";
import App from "./app.vue";
import SvgIcon from "./components/SvgIcon";
import VideoCard from "./components/VideoCard";
import "./css/app.scss";

// Vant-UI
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

// Vuex
import store from "./store/index";

//路由
import router from './router';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//组件
Vue.component("svg-icon", SvgIcon);
Vue.component("video-card", VideoCard);

//svg
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
requireAll(req);

export default new Vue({
  el: "#app",
  template: "<app/>",
  router,
  store,
  components: {
    app: App
  }
});
