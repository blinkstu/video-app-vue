<template>
  <div class="page distribution grey">
    <van-nav-bar left-arrow @click-left="$router.back()" title="提成百分比" />
    <div class="card">
      <div class="card-header">普通提成</div>
      <div class="card-body">
        <van-cell-group :border="false">
          <van-cell title="普通会员" value="15%"></van-cell>
          <van-cell title="VIP会员" value="30%"></van-cell>
        </van-cell-group>
      </div>
    </div>
    <div class="card">
      <div class="card-header">推广人数达到99人</div>
      <div class="card-body">
        <van-cell-group :border="false">
          <van-cell title="普通会员" value="20%"></van-cell>
          <van-cell title="VIP会员" value="35%"></van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>