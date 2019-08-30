<template>
  <div class="page promotion grey">
    <van-nav-bar left-arrow @click-left="$router.back()" title="宣传推广" />
    <div class="card">
      <div class="card-header">我的信息</div>
      <div class="card-body promotion-card">当前已推广0人</div>
    </div>
    <div class="card">
      <div class="card-header">推广链接</div>
      <div class="card-body promotion-card">
        <div class="promotion-link">
          <input type="text" :value="url" />
        </div>
        <br />
        <van-button type="primary">复制链接</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "@/utils/api";
import {Toast} from 'vant'
export default {
  data() {
    return {
      url: null
    };
  },
  methods: {
    async init() {
      const toast = Toast.loading({
        duration: 0
      })
      var result = await post("/video/promotion/code");
      toast.clear();
      if (result) {
        this.url = result.data;
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>