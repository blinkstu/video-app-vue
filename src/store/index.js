import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import { Toast } from "vant";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", false, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters
});

store.image = function(url) {
  if (
    new RegExp(
      "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"
    ).test(url)
  ) {
    return url;
  }
  return store.state.app.baseUrl + "upload/" + url;
};

store.time = function(timestamp) {
  var time = new Date(timestamp * 1000);
  return (
    time.getFullYear() +
    "-" +
    (time.getMonth() + 1) +
    "-" +
    time.getDate() +
    " " +
    time.getHours() +
    ":" +
    time.getMinutes()
  );
};

Toast.allowMultiple();

export default store;
