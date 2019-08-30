<template>
  <div class="page home">
    <div class="home-top"></div>
    <div class="main-content">
      <div class="search-bar">
        <svg-icon icon-class="search"></svg-icon>
        <span>搜索试试</span>
      </div>
      <div class="home-swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img
              src="https://liangcang-material.alicdn.com/prod/upload/a4aefa24f5b9456e8b69200e40f19658.jpg?x-oss-process=image/resize,w_1242/format,webp/interlace,1"
              alt
            />
          </swiper-slide>
          <swiper-slide>
            <img
              src="https://liangcang-material.alicdn.com/prod/upload/36d3d91bda44486a8ad27ec1a22c7d5e.jpg?x-oss-process=image/resize,w_1242/format,webp/interlace,1"
              alt
            />
          </swiper-slide>
          <swiper-slide>
            <img
              src="https://liangcang-material.alicdn.com/prod/upload/b4a62fce9c104bd7b2fe8a3f196068ae.jpg?x-oss-process=image/resize,w_1242/format,webp/interlace,1"
              alt
            />
          </swiper-slide>
        </swiper>
      </div>

      <div class="home-divider">
        <svg-icon class="love" icon-class="love"></svg-icon>
        <div class="title">猜你喜欢</div>
        <div class="more">
          <span>更多</span>
          <svg-icon icon-class="more"></svg-icon>
        </div>
      </div>

      <div class="content-wrap">
        <video-card v-for="item in random" :key="item.id" :data="item"></video-card>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.swiper-inner {
  width: 100%;
  height: 400px;
  padding-top: 50px;
  padding-bottom: 50px;
}
.swiper-container {
  padding-bottom: 5px;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 94%;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.1) !important;
  img {
    display: block;
  }
}
.swiper-slide-shadow-left {
  display: none;
}
.swiper-slide-shadow-right {
  display: none;
}
</style>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { get } from "@/utils/api";
export default {
  data() {
    return {
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }
      },
      random: null
    };
  },
  methods: {
    async init() {
      var result = await get("/video/video/random");
      if (result) {
        this.random = result.data;
      }
    }
  },
  mounted() {
    this.init();
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>