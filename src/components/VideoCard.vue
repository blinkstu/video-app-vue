<template>
  <div class="video-card">
    <div class="link" @click="$router.push('/detail/'+data.id)">
      <div class="image">
        <img :src="$store.image(data.thumbnail)" alt />
      </div>
      <div class="info">
        <div class="title">{{data.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  methods: {
  }
};
</script>