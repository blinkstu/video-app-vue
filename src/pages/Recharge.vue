<template>
  <div class="page recharge grey">
    <van-nav-bar left-arrow @click-left="$router.back()" title="开通VIP" />
    <div v-if="show" class="card">
      <div class="card-header">我的信息</div>
      <div class="card-body">
        <van-cell-group :border="false">
          <van-cell title="当前状态">{{vipName}}</van-cell>
          <van-cell v-if="!infinite && vip">
            <vue-countdown-timer
              :start-time="'2018-10-10 00:00:00'"
              :end-time="vip.expire_time"
              :interval="1000"
              :end-text="'账号已到期'"
              :day-txt="'天'"
              :hour-txt="'小时'"
              class="count-down"
            >
              <template slot="countdown" slot-scope="scope">
                <span>剩余</span>
                <span>{{scope.props.days}}</span>
                <span>{{scope.props.dayTxt}}</span>
                <span>{{scope.props.hours}}</span>
                <span>{{scope.props.hourTxt}}</span>
                <span>{{scope.props.minutes}}</span>
                <span>分钟</span>
                <span>{{scope.props.seconds}}</span>
                <span>秒</span>
              </template>
            </vue-countdown-timer>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <div v-if="show && !infinite" class="card">
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
        <van-button @click="handleCreateOrder" type="primary">
          <van-loading v-if="loading" color="white" type="spinner" size="12px" />
          <span v-else>确认购买 ¥{{items[radio].price}}</span>
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { get, post } from "@/utils/api";
import { Toast } from "vant";
export default {
  name: "Recharge",
  data() {
    return {
      radio: 0,
      items: null,
      show: false,
      infinite: false,
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
    async handleCreateOrder() {
      var itemId = this.items[this.radio].id;
      this.loading = true;
      var result = await post("/video/order/create_order", { item_id: itemId });
      this.loading = false;
      if (result) {
        this.$router.push("/user/pay_order/" + result.data.out_trade_no);
      }
    }
  },
  computed: {
    vipName() {
      var vip = this.vip;
      if (vip) {
        return "已开通 " + vip.vip_level_name + "会员";
      } else {
        return "未开通";
      }
    },
    vip() {
      var vip = this.$store.state.app.userInfo.vip;
      if (vip) {
        if(vip.infinite == 1){
          this.infinite = true;
          return vip;
        }
        var expireTime = vip.expire_time * 1000;
        var currentTime = new Date();
        if(expireTime < currentTime){
          return false;
        }
        return vip;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>