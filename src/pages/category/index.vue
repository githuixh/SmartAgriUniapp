<template>
  <view class="category-container">
    <!-- 左侧分类导航 -->
    <scroll-view class="category-nav" scroll-y>
      <view 
        class="nav-item" 
        v-for="(item, index) in categories" 
        :key="index"
        :class="{ active: currentCategory.id === item.id }"
        @click="switchCategory(item)"
      >
        <text>{{item.name}}</text>
      </view>
    </scroll-view>
    
    <!-- 右侧分类内容 -->
    <scroll-view class="category-content" scroll-y>
      <!-- 子分类标题 -->
      <view class="sub-category-title">
        <text>{{currentCategory.name}}</text>
      </view>
      
      <!-- 子分类列表 -->
      <view class="sub-category-list">
        <view 
          class="sub-category-item"
          v-for="(item, index) in currentCategory.children"
          :key="index"
          @click="goToList(item)"
        >
          <view class="image-box">
            <text>{{item.name[0]}}</text>
          </view>
          <text class="name">{{item.name}}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { categoryApi } from '@/api'

export default {
  data() {
    return {
      categories: [],
      currentCategory: {}
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    // 切换分类
    switchCategory(category) {
      this.currentCategory = category
    },
    async getCategoryList() {
      try {
        const result = await categoryApi.getCategoryList()
        console.log(result)
        this.categories = result
      } catch (error) {
        console.error('获取分类列表失败:', error)
      }
    },
    // 跳转到商品列表
    goToList(subCategory) {
      uni.navigateTo({
        url: `/pages/goods/list/index?type=${subCategory.type}&title=${subCategory.name}`
      })
    }
  }
}
</script>

<style>
.category-container {
  display: flex;
  height: 100vh;
  background: #fff;
}

.category-nav {
  width: 200rpx;
  height: 100%;
  background: var(--light-green);
}

.nav-item {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #333;
  position: relative;
}

.nav-item.active {
  background: #fff;
  color: var(--primary-color);
  font-weight: bold;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8rpx;
  height: 32rpx;
  background: var(--primary-color);
  border-radius: 0 4rpx 4rpx 0;
}

.category-content {
  flex: 1;
  height: 100%;
  padding: 20rpx;
}

.sub-category-title {
  padding: 20rpx 0;
  font-size: 32rpx;
  color: var(--primary-color);
  font-weight: bold;
}

.sub-category-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20rpx;
}

.sub-category-item {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}

.image-box {
  width: 120rpx;
  height: 120rpx;
  background: var(--light-yellow);
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
  font-size: 32rpx;
  color: var(--secondary-color);
  transition: all 0.3s;
}

.sub-category-item:active .image-box {
  transform: scale(0.95);
  opacity: 0.8;
}

.name {
  font-size: 26rpx;
  color: #333;
}
</style> 