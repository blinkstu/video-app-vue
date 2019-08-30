<template>
  <div class="page detail">
    <van-nav-bar :title="data.title" left-arrow @click-left="$router.back()" />
    <div v-if='show' id="video" style="width:100%;"></div>
  </div>
</template>


<script>
import "../../static/ckplayer/ckplayer.js";
import { get } from "@/utils/api";

export default {
  data() {
    return {
      data: {},
      player: null,
      show: true
    };
  },
  methods: {
    async init() {
      var result = await get("/video/video/detail", {
        id: this.$route.params.id
      });
      if (result) {
        this.data = result.data;
        var videoObject = {
          container: "#video", //“#”代表容器的ID，“.”或“”代表容器的class
          variable: "player", //该属性必需设置，值等于下面的new chplayer()的对象
          flashplayer: false, //如果强制使用flashplayer则设置成true
          video: this.$store.image(result.data.video_url), //视频地址
          loaded: "loadedHandler"
        };
        this.player = new ckplayer(videoObject);
      }
    },
    timeHandler(t) {
      console.log(t);
      if (t > 10) {
        this.show = false;
      }
    }
  },
  mounted() {
    var that = this;
    window.loadedHandler = () => {
      that.player.addListener("time", that.timeHandler);
    };
    this.init();
  },
  beforeDestroy() {
    this.show = false;
    this.player = null;
    window.loadedHandler = null;
  }
};
</script>