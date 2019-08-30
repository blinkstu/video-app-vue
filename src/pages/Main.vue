<template>
  <div class="page main">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>

    <van-tabbar @change="tabChange" route v-model="active">
      <van-tabbar-item to="/">
        <div class="item">
          <svg-icon icon-class="首页" class="not-selected"></svg-icon>
          <svg-icon icon-class="首页1" class="selected"></svg-icon>
          <span>首页</span>
        </div>
      </van-tabbar-item>
      <van-tabbar-item to="/channel">
        <div class="item">
          <svg-icon icon-class="频道" class="not-selected"></svg-icon>
          <svg-icon icon-class="频道1" class="selected"></svg-icon>
          <span>频道</span>
        </div>
      </van-tabbar-item>
      <van-tabbar-item to="/bookmark">
        <div class="item">
          <svg-icon
            icon-class="收藏"
            style="width:1.2em;height:1.2em;margin-top:0.3em;"
            class="not-selected"
          ></svg-icon>
          <svg-icon
            icon-class="收藏1"
            style="width:1.2em;height:1.2em;margin-top:0.3em;"
            class="selected"
          ></svg-icon>
          <span>收藏</span>
        </div>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <div class="item">
          <svg-icon icon-class="我的" class="not-selected"></svg-icon>
          <svg-icon icon-class="我的1" class="selected"></svg-icon>
          <span>我的</span>
        </div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {};
  },
  data() {
    return {
      transitionName: null,
      active: 0,
      tab_i: null
    };
  },
  methods: {
    tabChange(i) {
      if (i > this.tab_i) {
        this.transitionName = "tab-left";
      } else {
        this.transitionName = "tab-right";
      }
      this.tab_i = i;
    }
  },
  mounted() {
    var checks = document.getElementsByClassName("van-tabbar-item");
    for (var i=0;i<checks.length;i++) {
      if(checks[i].className == 'van-tabbar-item van-tabbar-item--active'){
        this.tab_i = i;
        this.active = i;
      }
    }
  },
};
</script>