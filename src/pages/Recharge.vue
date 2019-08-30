<template>
  <div class="page recharge grey">
    <van-nav-bar left-arrow @click-left="$router.back()" title="开通VIP" />
    <div class="card">
      <div class="card-header">我的信息</div>
      <div class="card-body promotion-card">当前VIP已经到期</div>
    </div>
    <div class="card">
      <div class="card-body promotion-card">
        <h2 class="van-block-title">选择购买时间</h2>
        <van-radio-group v-model="radio">
          <van-radio v-for="(item,index) in items" :key="item.id" :name="index" checked-color="#b02e81">{{item.name}} &nbsp;&nbsp;&nbsp; <span class="price">¥ {{item.price}}</span></van-radio>
        </van-radio-group>
        <br>
        <br>
        <van-button type="primary">确认购买 ¥{{items[radio].price}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {get } from '@/utils/api'
import { Toast} from 'vant'
export default {
  data() {
    return {
      radio: 0,
      items: null
    };
  },
  methods: {
    async init(){
      var toast = Toast.loading({
        duration: 0
      })
      var result = await get('/video/item/item_list')
      toast.clear();
      if(result){
        this.items = result.data.items;
      }
    }
  },
  mounted() {
    this.init()
  },
};
</script>