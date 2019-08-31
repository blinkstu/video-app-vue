<template>
  <div class="page recharge grey">
    <van-nav-bar left-arrow @click-left="$router.back()" title="开通VIP" />
    <div v-if="show" class="card">
      <div class="card-header">我的信息</div>
      <div class="card-body promotion-card">当前VIP已经到期</div>
    </div>
    <div v-if="show" class="card">
      <div class="card-body promotion-card">
        <h2 class="van-block-title">选择购买时间</h2>
        <van-radio-group v-model="radio">
          <van-radio
            v-for="(item,index) in items"
            :key="item.id"
            :name="index"
            checked-color="#b02e81"
          >
            {{item.name}} &nbsp;&nbsp;&nbsp;
            <span class="price">¥ {{item.price}}</span>
          </van-radio>
        </van-radio-group>
        <br />
        <br />
        <van-button @click="handleCreateOrder" type="primary"><van-loading v-if="loading" color="white" type="spinner" size="12px" /> <span v-else>确认购买 ¥{{items[radio].price}}</span></van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from "@/utils/api";
import { Toast } from "vant";
export default {
  name: 'Recharge',
  data() {
    return {
      radio: 0,
      items: null,
      show: false,
      loading: false
    };
  },
  methods: {
    async init() {
      var toast = Toast.loading({
        duration: 0
      });
      var result = await get("/video/item/item_list");
      this.show = true;
      toast.clear();
      if (result) {
        this.items = result.data.items;
      }
    },
    async handleCreateOrder(){
      var itemId = this.items[this.radio].id;
      this.loading = true;
      var result = await post('/video/order/create_order', {item_id: itemId})
      this.loading = false;
      if(result){
        Toast('订单创建成功！')
        this.$router.push('/user/pay_order/'+result.data.out_trade_no)
        console.log(result);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>