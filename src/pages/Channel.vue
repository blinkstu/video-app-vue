<template>
  <div class="page channel">
    <van-nav-bar
      title="频道"
    />
    <div class="channel-main">
      <div class="sidebar">
        <div class="sidebar-item" v-for="(item,key) in categoryList " :key="item.id" :class="{selected: key == currentSelected}" @click="select(key)">{{item.name}}</div>
      </div>
      <div class="blocks">
        <div class="item" @click="$router.push('/detail/123')" v-for="item in secondaryList" :key="item.id">
          <div class="image">
            <img :src="$store.image(item.thumbnail)" alt />
          </div>
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/utils/api";
import {Toast} from 'vant'
export default {
  data() {
    return {
      categoryList: null,
      secondaryList: null,
      currentSelected: 0
    };
  },
  methods: {
    async init(index) {
      const toast = Toast.loading({
        duration: 0
      })
      var result = await get("/video/category/list", {});
      toast.clear();
      if (result) {
        this.categoryList = result.data;
        this.secondaryList = result.data[index].children;
      }
    },
    select(index){
      this.currentSelected = index;
      this.secondaryList = this.categoryList[index].children;
    }
  },
  created() {
    this.init(0);
  }
};
</script>