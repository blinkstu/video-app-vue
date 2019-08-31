<template>
  <div class="page distribution grey">
    <van-nav-bar left-arrow @click-left="$router.back()" title="分销赚钱" />
    <div class="card">
      <div class="card-header">分销信息</div>
      <div class="card-body">
        <van-cell-group :border="false">
          <van-cell title="下级人数" is-link value="20人"></van-cell>
          <van-cell
            title="提成百分比"
            @click="$router.push('distribution/commission')"
            is-link
            value="20%"
          ></van-cell>
          <van-cell title="提成收入记录" is-link></van-cell>
        </van-cell-group>
      </div>
    </div>

    <div class="card">
      <div class="card-header">收入信息</div>
      <div class="card-body">
        <van-cell-group :border="false">
          <van-cell title="账户余额" value="¥200"></van-cell>
          <van-cell title="累计收入金额" value="¥200"></van-cell>
          <van-cell title="立即提现" is-link></van-cell>
        </van-cell-group>
      </div>
    </div>

    <div class="card">
      <div class="card-header">下级推广链接</div>
      <div class="card-body promotion-card">
        <div class="promotion-link">
          <input type="text" :value="url" />
        </div>
        <br />
        <van-button type="primary" @click="copyLink">复制链接</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { post, get } from "@/utils/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      url: null,
      promotion_count: 0
    };
  },
  methods: {
    async init() {
      const toast = Toast.loading({
        duration: 0
      });
      var result = await post("/video/promotion/code");
      toast.clear();
      if (result) {
        this.url = result.data;
        this.$clipboard(this.url);
      }
    },
    copyLink() {
      var result = this.$clipboard(this.url);
      console.log(result);
    }
  },
  mounted() {
    this.init();
  }
};
</script>