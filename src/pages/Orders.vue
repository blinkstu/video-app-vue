<template>
  <div class="page orders">
    <van-nav-bar left-arrow @click-left="$router.back()" title="订单列表" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="init()">
      <van-cell
        v-for="item in orders"
        :key="item.id"
        :title="'购买项目 '+item.item1.name + ' ¥' + item.amount"
        :value="states(item.status)"
        :label="' ' +$store.time(item.create_time)"
      />
    </van-list>
  </div>
</template>

<script>
import { get, post } from "@/utils/api";
export default {
  data() {
    return {
      loading: false,
      page: 0,
      limit: 10,
      orders: [],
      finished: false
    };
  },
  methods: {
    states(status) {
      if (status == 0) {
        return "未支付";
      } else {
        return "支付成功";
      }
    },
    async init() {
      this.page += 1;
      var result = await get("/video/order/order_list", {
        page: this.page,
        limit: this.limit
      });
      this.loading = false;
      if (result) {
        if (result.data.length <= 0) {
          this.finished = true;
          return false;
        }
        this.orders = this.orders.concat(result.data);
      }
    }
  }
};
</script>