<template>
  <div class="page promotion grey">
    <van-nav-bar left-arrow @click-left="$router.back()" title="宣传推广" />
    <div class="card">
      <div class="card-header">我的信息</div>
      <div class="card-body">
        <van-cell-group :border="false">
          <van-cell title="查看奖励明细" is-link @click="$router.push('/user/promotion/reward_log')"></van-cell>
          <van-cell title="当前已推广人数" :value="promotion_count"></van-cell>
        </van-cell-group>
        <div class="description-text">
          每推广成功一人，即可获得1小时体验会员
        </div>
        <div class="description-text">
          推广人数达到99人即可享受20%下级会员提成，VIP会员享受35%提成
        </div>
      </div>
    </div> 
    <div class="card">
      <div class="card-header">推广链接</div>
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
import { post,get } from "@/utils/api";
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
      var result2 = await get("/video/promotion/promotion_info")
      toast.clear();
      if (result) {
        this.url = result.data;
        this.$clipboard(this.url);
      }
      if(result2){
        this.promotion_count = result2.data.promotion_count;
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