<template>
  <view class="container">
    <!-- 活动主图 -->
    <view class="activity-banner">
      <view class="banner-box">
        <text>活动主图</text>
      </view>
      <view class="activity-status" :class="activityInfo.status">
        {{activityInfo.statusText}}
      </view>
    </view>
    
    <!-- 活动基本信息 -->
    <view class="activity-info">
      <view class="title">{{activityInfo.title}}</view>
      <view class="time-info">
        <text class="label">活动时间：</text>
        <text class="time">{{activityInfo.startTime}} 至 {{activityInfo.endTime}}</text>
      </view>
      <view class="desc">{{activityInfo.desc}}</view>
    </view>
    
    <!-- 活动规则 -->
    <view class="activity-rules">
      <view class="section-title">活动规则</view>
      <view class="rule-list">
        <view class="rule-item" v-for="(rule, index) in activityInfo.rules" :key="index">
          <text class="num">{{index + 1}}</text>
          <text class="content">{{rule}}</text>
        </view>
      </view>
    </view>
    
    <!-- 活动商品 -->
    <view class="activity-goods">
      <view class="section-title">活动商品</view>
      <view class="goods-list">
        <view 
          class="goods-item" 
          v-for="(item, index) in activityInfo.goods" 
          :key="index"
          @click="goToDetail(item)"
        >
          <view class="goods-image-box">
            <text>商品图片</text>
            <view class="discount-tag" v-if="item.discount">{{item.discount}}折</view>
          </view>
          <view class="goods-info">
            <text class="goods-name">{{item.name}}</text>
            <view class="price-box">
              <view class="price-info">
                <text class="price">¥{{item.price}}</text>
                <text class="original" v-if="item.originalPrice">¥{{item.originalPrice}}</text>
              </view>
              <text class="sold">已售{{item.sold}}件</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部按钮 -->
    <view class="footer" v-if="activityInfo.status === 'ongoing'">
      <button class="share-btn">分享活动</button>
      <button class="join-btn">立即参与</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activityInfo: {
        id: 1,
        title: '当季水果特惠',
        desc: '精选应季水果，产地直供，品质保证。活动期间全场8折起，部分商品限时5折抢购！',
        startTime: '2024-03-01',
        endTime: '2024-03-15',
        status: 'ongoing', // ongoing, upcoming, ended
        statusText: '进行中',
        rules: [
          '活动期间，所有商品享受8折优惠',
          '每人每天限购3件特价商品',
          '活动商品不与其他优惠同享',
          '活动最终解释权归本店所有'
        ],
        goods: [
          {
            id: 1,
            name: '云南红富士苹果',
            price: '29.9',
            originalPrice: '39.9',
            discount: '7.5',
            sold: 1999
          },
          {
            id: 2,
            name: '海南小台农芒果',
            price: '19.9',
            originalPrice: '39.9',
            discount: '5.0',
            sold: 999
          }
        ]
      }
    }
  },
  onLoad(options) {
    // 获取活动ID
    const activityId = options.id
    this.loadActivityDetail(activityId)
  },
  methods: {
    // 加载活动详情
    loadActivityDetail(id) {
      console.log('Loading activity:', id)
      // TODO: 调用接口获取活动详情
    },
    
    // 跳转到商品详情
    goToDetail(goods) {
      uni.navigateTo({
        url: `/pages/goods/detail/index?id=${goods.id}`
      })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 120rpx;
}

.activity-banner {
  position: relative;
  width: 100%;
  height: 500rpx;
}

.banner-box {
  width: 100%;
  height: 100%;
  background: var(--light-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.activity-status {
  position: absolute;
  right: 20rpx;
  top: 20rpx;
  padding: 8rpx 24rpx;
  border-radius: 24rpx;
  font-size: 24rpx;
}

.activity-status.ongoing {
  background: var(--light-green);
  color: var(--primary-color);
}

.activity-status.upcoming {
  background: var(--light-yellow);
  color: var(--secondary-color);
}

.activity-status.ended {
  background: #f5f5f5;
  color: #999;
}

.activity-info {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.title {
  font-size: 36rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.time-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.label {
  font-size: 26rpx;
  color: #999;
}

.time {
  font-size: 26rpx;
  color: #666;
}

.desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.activity-rules {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.rule-list {
  padding: 0 20rpx;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.rule-item .num {
  width: 36rpx;
  height: 36rpx;
  background: var(--light-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: var(--primary-color);
  margin-right: 16rpx;
  flex-shrink: 0;
}

.rule-item .content {
  flex: 1;
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}

.activity-goods {
  background: #fff;
  padding: 30rpx;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10rpx;
}

.goods-item {
  width: 50%;
  padding: 10rpx;
}

.goods-image-box {
  position: relative;
  width: 100%;
  height: 345rpx;
  background: #f5f5f5;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  margin-bottom: 16rpx;
}

.discount-tag {
  position: absolute;
  left: 0;
  top: 20rpx;
  background: var(--price-color);
  color: #fff;
  font-size: 24rpx;
  padding: 4rpx 16rpx;
  border-radius: 0 20rpx 20rpx 0;
}

.goods-info {
  padding: 0 10rpx;
}

.goods-name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  line-height: 1.4;
}

.price-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-info {
  display: flex;
  align-items: baseline;
}

.price {
  font-size: 32rpx;
  color: var(--price-color);
  font-weight: bold;
}

.original {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
  margin-left: 8rpx;
}

.sold {
  font-size: 24rpx;
  color: #999;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100rpx;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.share-btn {
  width: 200rpx;
  height: 72rpx;
  line-height: 72rpx;
  background: var(--light-yellow);
  color: var(--secondary-color);
  font-size: 28rpx;
  margin-right: 20rpx;
  border: 1px solid var(--secondary-color);
}

.join-btn {
  flex: 1;
  height: 72rpx;
  line-height: 72rpx;
  background: var(--primary-color);
  color: #fff;
  font-size: 28rpx;
}
</style> 