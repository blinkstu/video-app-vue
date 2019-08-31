<template>
  <div class="page recharge grey">
    <van-nav-bar left-arrow @click-left="$router.back()" title="确认订单" />
    <div v-if="show" class="card">
      <div class="card-header">订单信息</div>
      <div class="card-body">
        <van-cell-group :border="false">
          <van-cell title="订单号" :value="order.out_trade_no"></van-cell>
          <van-cell title="类型" :value="order.item1.name"></van-cell>
          <van-cell title="订单总额" :value="'¥ '+order.amount"></van-cell>
          <van-cell title="创建时间" :value="createTime"></van-cell>
        </van-cell-group>
        <br />
        <br />
        <a @click="handlePay" target="_blank" style="display:block;" v-bind:href="payUrl" class="login-button">确认支付</a>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from "@/utils/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      payUrl: null,
      show: false,
      order: null,
      toast: null
    };
  },
  methods: {
    handlePay(){
      if(!this.toast){
      this.toast = Toast.loading({
        duration: 0,       // 持续展示 toast
        message: '请在弹出网页中完成支付'
      });
      }
 

    },
    async init() {
      var result = await get("/video/order/order_pay", {
        id: this.$route.params.out_trade_no
      });
      if (result) {
        this.payUrl = result.data.url;
        this.order = result.data.order;
        this.createTime = this.$store.time(this.order.create_time);
        this.show = true;
      }
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy(){
    this.toast.clear();
    this.toast = null;
  }
};
</script>