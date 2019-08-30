<template>
  <div class="page promotion grey">
    <van-nav-bar left-arrow @click-left="$router.back()" title="宣传推广" />
    <div class="card">
      <div class="card-header">我的信息</div>
      <div class="card-body promotion-card">
        当前已推广0人
      </div>
    </div>
    <div class="card">
      <div class="card-header">推广链接</div>
      <div class="card-body promotion-card">
        <div class="promotion-link">
          <input type="text" value="http://t.cn/Ai8gtvT9" />
        </div>
        <br>
        <van-button type="primary">复制链接</van-button>
      </div>
    </div>
  </div>
</template>