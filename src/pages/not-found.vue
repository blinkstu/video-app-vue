<template>
  <f7-page>
    <van-nav-bar left-arrow @click-left="$router.back()" title="错误404" />
    <div class="page grey">
      <div style="margin: 20px;">
        <p>很抱歉</p>
        <p>没有找到内容</p>
      </div>
    </div>
  </f7-page>
</template>
<script>
export default {};
</script>