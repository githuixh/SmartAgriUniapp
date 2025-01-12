<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-box" @click="goToSearch">
        <text class="uni-icon search">搜索</text>
        <text class="placeholder">搜索商品</text>
      </view>
    </view>
    
    <!-- 轮播图 -->
    <swiper class="banner" circular autoplay interval="3000" duration="500">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <view class="banner-box" @click="handleBannerClick(item)">
          <text class="banner-text">Banner {{index + 1}}</text>
        </view>
      </swiper-item>
    </swiper>
    
    <!-- 分类导航 -->
    <view class="nav-grid">
      <view class="nav-item" v-for="(item, index) in navs" :key="index" @click="navigateTo(item.url)">
        <view class="nav-icon-box">
          <text>{{item.text[0]}}</text>
        </view>
        <text class="nav-text">{{item.text}}</text>
      </view>
    </view>
    
    <!-- 活动区域 -->
    <view class="activity-section">
      <view class="section-header">
        <text class="title">热门活动</text>
        <text class="more" @click="navigateTo('/pages/activity/list/index')">更多 ></text>
      </view>
      <view class="activity-box">
        <view class="activity-item" v-for="(item, index) in activities" :key="index" @click="handleActivityClick(item)">
          <view class="activity-image-box">
            <text>活动{{index + 1}}</text>
          </view>
          <view class="activity-info">
            <text class="activity-title">{{item.title}}</text>
            <text class="activity-desc">{{item.desc}}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 商品推荐 -->
    <view class="goods-section">
      <view class="section-header">
        <text class="title">商品推荐</text>
        <text class="more" @click="navigateTo('/pages/goods/list')">更多 ></text>
      </view>
      <view class="goods-list">
        <view class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="goToDetail(item)">
          <view class="goods-image-box">
            <text>商品图片</text>
          </view>
          <view class="goods-info">
            <text class="goods-name">{{item.name}}</text>
            <text class="goods-desc">{{item.desc}}</text>
            <view class="goods-price-box">
              <text class="price">¥{{item.price}}</text>
              <text class="sold">已售{{item.sold}}件</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      banners: [
        { image: '/static/banner1.jpg', url: '/pages/activity/detail/index?id=1' },
        { image: '/static/banner2.jpg', url: '/pages/goods/detail/index?id=1' },
        { image: '/static/banner3.jpg', url: '/pages/activity/detail/index?id=2' }
      ],
      navs: [
        { text: '时令水果', url: '/pages/category/fruit' },
        { text: '新鲜蔬菜', url: '/pages/category/vegetable' },
        { text: '地方特产', url: '/pages/category/specialty' },
        { text: '粮油调味', url: '/pages/category/grocery' },
        { text: '优惠专区', url: '/pages/activity/discount' }
      ],
      activities: [
        {
          title: '当季热卖',
          desc: '应季水果特惠',
          url: '/pages/activity/detail?id=1'
        },
        {
          title: '产地直供',
          desc: '优质果蔬直达',
          url: '/pages/activity/detail?id=2'
        }
      ],
      goodsList: [
        {
          id: 1,
          name: '云南红富士苹果',
          desc: '皮薄多汁 甜度适中',
          price: '29.9',
          sold: 1999
        },
        {
          id: 2,
          name: '海南小台农芒果',
          desc: '香甜可口 细腻无丝',
          price: '39.9',
          sold: 999
        }
      ]
    }
  },
  methods: {
    goToSearch() {
      uni.navigateTo({
        url: '/pages/search/index'
      })
    },
    handleBannerClick(banner) {
      uni.navigateTo({
        url: banner.url
      })
    },
    navigateTo(url) {
      // 处理分类页面的跳转
      const categoryMap = {
        '/pages/category/fruit': { type: 'fruit', title: '时令水果' },
        '/pages/category/vegetable': { type: 'vegetable', title: '新鲜蔬菜' },
        '/pages/category/specialty': { type: 'specialty', title: '地方特产' },
        '/pages/category/grocery': { type: 'grocery', title: '粮油调味' }
      }
      
      // 如果是分类页面
      if (categoryMap[url]) {
        const { type, title } = categoryMap[url]
        uni.navigateTo({
          url: `/pages/goods/list/index?type=${type}&title=${title}`
        })
      } 
      // 如果是优惠专区
      else if (url === '/pages/activity/discount') {
        uni.navigateTo({
          url: '/pages/goods/list/index?type=discount&title=优惠专区'
        })
      }
      // 其他页面正常跳转
      else {
        uni.navigateTo({ url })
      }
    },
    handleActivityClick(activity) {
      uni.navigateTo({
        url: `/pages/activity/detail/index?id=${activity.id}`
      })
    },
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
}

.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--primary-color);
  padding: 20rpx 30rpx;
}

.search-box {
  display: flex;
  align-items: center;
  height: 72rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 36rpx;
  padding: 0 30rpx;
}

.search-box .search {
  font-size: 32rpx;
  color: #999;
  margin-right: 10rpx;
}

.placeholder {
  font-size: 28rpx;
  color: #999;
}

.banner {
  margin-top: 112rpx;
  height: 300rpx;
}

.banner-box {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-text {
  color: #999;
  font-size: 28rpx;
}

.nav-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
  background: #fff;
}

.nav-item {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}

.nav-icon-box {
  width: 80rpx;
  height: 80rpx;
  background-color: var(--light-green);
  border-radius: 50%;
  margin-bottom: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
}

.nav-text {
  font-size: 24rpx;
  color: #333;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
}

.section-header .title {
  font-size: 32rpx;
  font-weight: bold;
  color: var(--primary-color);
}

.section-header .more {
  font-size: 24rpx;
  color: #999;
}

.activity-section {
  margin-top: 20rpx;
  background: var(--light-yellow);
}

.activity-box {
  padding: 0 20rpx 30rpx;
}

.activity-item {
  position: relative;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.activity-image-box {
  width: 100%;
  height: 200rpx;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.activity-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}

.activity-title {
  font-size: 32rpx;
  color: #fff;
  font-weight: bold;
}

.activity-desc {
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
  margin-top: 6rpx;
}

.goods-section {
  margin-top: 20rpx;
  background: var(--light-green);
}

.goods-list {
  padding: 0 20rpx;
}

.goods-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.goods-image-box {
  width: 200rpx;
  height: 200rpx;
  background-color: #e0e0e0;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.goods-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
}

.goods-name {
  font-size: 28rpx;
  color: #333;
  line-height: 1.4;
}

.goods-desc {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
}

.goods-price-box {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 32rpx;
  color: var(--price-color);
  font-weight: bold;
}

.sold {
  font-size: 24rpx;
  color: #999;
}
</style>
