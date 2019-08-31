<template>
  <div class="page my">
    <Login v-if="!loged" :back="false"/>
    <div class="page" v-if="loged">
      <div class="home-top"></div>
      <div class="cogs" @click="$router.push('/user/settings')">
        <img src="/static/images/personpage_icon_setting@2x.png" alt />
      </div>
      <div class="content-block">
        <div class="profile">
          <div v-if="userInfo.avatar != ''" class="avatar">
            <img :src="$store.image(userInfo.avatar)" alt />
          </div>
          <div v-else class="avatar">
            <img src="/static/images/my-avatar.jpg" alt />
          </div>
          <div class="info">
            <div class="username">{{userInfo.user_nickname}}</div>
            <div class="data">{{vipName}}</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="vip-box" v-if="!vip" @click="$router.push('/user/recharge')">
          <span>开通VIP，畅想更多权益</span>
          <div class="button">升级VIP</div>
        </div>
        <div class="vip-box" v-if="vip" @click="$router.push('/user/recharge')">
          <span>已经开通 {{vipName}}</span>
          <div class="button">续费VIP</div>
        </div>
        <van-cell-group :border="false" class="custom-list">
          <van-cell is-link>
            <template slot="default">
              <div class="custom-inner">
                <div class="icon">
                  <img src="/static/images/personpage_icon_college2@2x.png" alt />
                </div>
                <div class="title">我的收藏</div>
              </div>
            </template>
          </van-cell>
          <van-cell @click="$router.push('/user/orders')" is-link>
            <template slot="default">
              <div class="custom-inner">
                <div class="icon">
                  <img src="/static/images/personpage_icon_ Records of consumption@2x.png" alt />
                </div>
                <div class="title">消费记录</div>
              </div>
            </template>
          </van-cell>
          <van-cell is-link @click="$router.push('/user/distribution')">
            <template slot="default">
              <div class="custom-inner">
                <div class="icon">
                  <img
                    src="/static/images/personpage_icon_ 6／5000  Distribution to make money@2x.png"
                    alt
                  />
                </div>
                <div class="title">分销赚钱</div>
              </div>
            </template>
          </van-cell>
          <van-cell @click="$router.push('/user/promotion')" is-link>
            <template slot="default">
              <div class="custom-inner">
                <div class="icon">
                  <img src="/static/images/personpage_icon_ To promote@2x.png" alt />
                </div>
                <div class="title">宣传推广</div>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "./Login";
export default {
  data() {
    return {
      loged: false,
      userInfo: null
    };
  },
  components: {
    Login
  },
  computed: {
    storeUserInfo() {
      return this.$store.state.app.userInfo;
    },
    vip(){
      var vip = this.storeUserInfo.vip;
      if(vip){
        var expireTime = vip.expire_time * 1000;
        var currentTime = new Date();
        if(vip.infinite == 1){
          return vip;
        }
        if(expireTime < currentTime){
          return false;
        }
        return vip;
      }
      return null
    },
    vipName(){
      if(this.vip){
        return this.vip.vip_level_name + '会员';
      } else {
        return '普通会员'
      }
    }
  },
  watch: {
    storeUserInfo(val) {
      if (val) {
        this.loged = true;
        this.userInfo = val;
      } else {
        this.loged = false;
        this.userInfo = null
      }
    }
  },
  mounted() {
    var userInfo = this.$store.state.app.userInfo;
    if (userInfo) {
      this.userInfo = userInfo;
      this.loged = true;
    }
  }
};
</script>
