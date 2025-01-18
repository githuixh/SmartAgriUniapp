<template>
  <view class="user-container">
    <!-- 用户信息头部 -->
    <view class="user-header">
      <view class="bg-wrap">
        <view class="user-info">
          <image class="avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
          <view class="info-right">
            <text class="nickname">{{userInfo.nickName}}</text>
          </view>
        </view>
        <view class="user-stats">
          <view class="stat-item" @click="navigateTo('/pages/user/favorite')">
            <view class="stat-content">
              <text class="num">0</text>
              <text class="label">收藏夹</text>
            </view>
          </view>
          <view class="divider"></view>
          <view class="stat-item" @click="navigateTo('/pages/user/coupon')">
            <view class="stat-content">
              <text class="num">0</text>
              <text class="label">优惠券</text>
            </view>
          </view>
          <view class="divider"></view>
          <view class="stat-item" @click="navigateTo('/pages/user/points')">
            <view class="stat-content">
              <text class="num">0</text>
              <text class="label">积分</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 订单卡片 -->
    <view class="order-card">
      <view class="card-header">
        <text class="title">我的订单</text>
        <view class="more" @click="navigateTo('/pages/order/list')">
          <text>全部订单</text>
          <text class="arrow">></text>
        </view>
      </view>
      <view class="order-types">
        <view class="type-item" @click="navigateTo('/pages/order/list?status=0')">
          <view class="icon-wrap">
            <text class="num" v-if="orderNums.pending">{{orderNums.pending}}</text>
            <view class="icon-box pending">
              <text class="uni-icon">&#xe65e;</text>
            </view>
          </view>
          <text class="label">待付款</text>
        </view>
        <view class="type-item" @click="navigateTo('/pages/order/list?status=1')">
          <view class="icon-wrap">
            <text class="num" v-if="orderNums.delivering">{{orderNums.delivering}}</text>
            <view class="icon-box delivering">
              <text class="uni-icon">&#xe63f;</text>
            </view>
          </view>
          <text class="label">待发货</text>
        </view>
        <view class="type-item" @click="navigateTo('/pages/order/list?status=2')">
          <view class="icon-wrap">
            <text class="num" v-if="orderNums.receiving">{{orderNums.receiving}}</text>
            <view class="icon-box receiving">
              <text class="uni-icon">&#xe639;</text>
            </view>
          </view>
          <text class="label">待收货</text>
        </view>
        <view class="type-item" @click="navigateTo('/pages/order/list?status=3')">
          <view class="icon-wrap">
            <view class="icon-box completed">
              <text class="uni-icon">&#xe645;</text>
            </view>
          </view>
          <text class="label">已完成</text>
        </view>
        <view class="type-item" @click="navigateTo('/pages/after-sale/list')">
          <view class="icon-wrap">
            <view class="icon-box refund">
              <text class="uni-icon">&#xe60f;</text>
            </view>
          </view>
          <text class="label">售后/退款</text>
        </view>
      </view>
    </view>
    
    <!-- 功能列表 -->
    <view class="feature-list">
      <view class="feature-item" @click="goToAddress">
        <view class="item-left">
          <text class="icon">📍</text>
          <text class="label">收货地址</text>
        </view>
        <text class="arrow">></text>
      </view>
      <view class="feature-item">
        <view class="item-left">
          <text class="icon">🎁</text>
          <text class="label">优惠券</text>
        </view>
        <text class="arrow">></text>
      </view>
      <view class="feature-item">
        <view class="item-left">
          <text class="icon">⭐</text>
          <text class="label">我的收藏</text>
        </view>
        <text class="arrow">></text>
      </view>
      <view class="feature-item">
        <view class="item-left">
          <text class="icon">⚙️</text>
          <text class="label">设置</text>
        </view>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script>
import { checkLogin } from '@/utils/auth'

export default {
  data() {
    return {
      userInfo: {
        nickName: '测试用户',
        avatarUrl: 'http://tmp/Pwiq7Bi2DzF76ffbd0c1502747fcda1594aa1453b86d.jpeg'
      },
      orderNums: {
        pending: 2,
        delivering: 1,
        receiving: 0
      },
      userStats: {
        favorite: 0,
        coupon: 0,
        points: 0
      }
    }
  },
  onShow() {
    if (!checkLogin()) {
      return
    }
    this.getUserInfo()
    this.getUserStats()
  },
  methods: {
    getUserInfo() {
      const userInfo = uni.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
    },
    goToAddress() {
      uni.navigateTo({
        url: '/pages/address/list/index?from=user'
      })
    },
    navigateTo(url) {
      uni.navigateTo({
        url
      })
    },
    getUserStatNum(key) {
      return this.userStats && this.userStats[key] ? this.userStats[key] : 0
    },
    getUserStats() {
      setTimeout(() => {
        this.userStats = {
          favorite: 8,
          coupon: 3,
          points: 520
        }
      }, 500)
    }
  }
}
</script>

<style>
.user-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.user-header {
  height: 400rpx;
  background: linear-gradient(180deg, var(--primary-color) 0%, #3d8b40 100%);
  position: relative;
  padding-top: 40rpx;
}

.bg-wrap {
  position: relative;
  z-index: 1;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 0 30rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.4);
}

.info-right {
  margin-left: 24rpx;
}

.nickname {
  color: #fff;
  font-size: 36rpx;
  font-weight: 500;
}

.user-stats {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.stat-item {
  flex: 1;
  display: flex;
  justify-content: center;
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140rpx;
}

.divider {
  width: 2rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 20rpx;
}

.stat-item .num {
  color: #fff;
  font-size: 40rpx;
  font-weight: bold;
  line-height: 1.2;
}

.stat-item .label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 26rpx;
  margin-top: 8rpx;
}

.stat-item:active .stat-content {
  transform: scale(0.95);
  opacity: 0.8;
}

.order-card {
  margin: -60rpx 20rpx 0;
  background: var(--light-green);
  border-radius: 16rpx;
  padding: 30rpx;
  position: relative;
  z-index: 2;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.card-header .title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.more {
  color: #999;
  font-size: 26rpx;
}

.more .arrow {
  margin-left: 4rpx;
}

.order-types {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 10rpx;
}

.type-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.icon-wrap {
  position: relative;
  margin-bottom: 16rpx;
}

.icon-box {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  background: var(--light-yellow);
}

.icon-box.pending {
  background: rgba(255, 148, 49, 0.1);
}
.icon-box.pending .iconfont {
  color: #ff9431;
}

.icon-box.delivering {
  background: rgba(255, 77, 79, 0.1);
}
.icon-box.delivering .iconfont {
  color: #ff4d4f;
}

.icon-box.receiving {
  background: rgba(64, 169, 255, 0.1);
}
.icon-box.receiving .iconfont {
  color: #40a9ff;
}

.icon-box.completed {
  background: rgba(7, 193, 96, 0.1);
}
.icon-box.completed .iconfont {
  color: #07c160;
}

.icon-box.refund {
  background: rgba(145, 84, 254, 0.1);
}
.icon-box.refund .iconfont {
  color: #9154fe;
}

.icon-wrap .num {
  position: absolute;
  top: -6rpx;
  right: -6rpx;
  min-width: 32rpx;
  height: 32rpx;
  padding: 0 8rpx;
  background: #ff4d4f;
  border-radius: 16rpx;
  color: #fff;
  font-size: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(255, 77, 79, 0.5);
}

.type-item .label {
  font-size: 26rpx;
  color: #333;
  line-height: 1.4;
}

.type-item:active .icon-box {
  transform: scale(0.95);
  opacity: 0.9;
}

.feature-list {
  margin: 20rpx;
  background: var(--light-green);
  border-radius: 16rpx;
  padding: 0 20rpx;
}

.feature-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.feature-item:last-child {
  border-bottom: none;
}

.item-left {
  display: flex;
  align-items: center;
}

.item-left .icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.item-left .label {
  font-size: 28rpx;
  color: #333;
}

.arrow {
  color: #ccc;
  font-size: 28rpx;
}

.uni-icon {
  font-family: uniicons;
  font-size: 48rpx;
  font-weight: normal;
  font-style: normal;
  line-height: 1;
}

.icon-box.pending .uni-icon {
  color: #ff9431;
}

.icon-box.delivering .uni-icon {
  color: #ff4d4f;
}

.icon-box.receiving .uni-icon {
  color: #40a9ff;
}

.icon-box.completed .uni-icon {
  color: #07c160;
}

.icon-box.refund .uni-icon {
  color: #9154fe;
}
</style> 