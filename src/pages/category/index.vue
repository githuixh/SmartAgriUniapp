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
export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          name: '时令水果',
          children: [
            { id: 11, name: '苹果', type: 'apple' },
            { id: 12, name: '橙子', type: 'orange' },
            { id: 13, name: '香蕉', type: 'banana' },
            { id: 14, name: '葡萄', type: 'grape' },
            { id: 15, name: '芒果', type: 'mango' },
            { id: 16, name: '西瓜', type: 'watermelon' }
          ]
        },
        {
          id: 2,
          name: '新鲜蔬菜',
          children: [
            { id: 21, name: '叶菜类', type: 'leaf' },
            { id: 22, name: '根茎类', type: 'root' },
            { id: 23, name: '茄果类', type: 'fruit' },
            { id: 24, name: '豆类', type: 'bean' },
            { id: 25, name: '菌菇类', type: 'mushroom' }
          ]
        },
        {
          id: 3,
          name: '地方特产',
          children: [
            { id: 31, name: '干果', type: 'nuts' },
            { id: 32, name: '腊味', type: 'preserved' },
            { id: 33, name: '山货', type: 'mountain' },
            { id: 34, name: '土特产', type: 'local' }
          ]
        },
        {
          id: 4,
          name: '粮油调味',
          children: [
            { id: 41, name: '大米', type: 'rice' },
            { id: 42, name: '食用油', type: 'oil' },
            { id: 43, name: '调味料', type: 'spice' },
            { id: 44, name: '杂粮', type: 'grain' }
          ]
        }
      ],
      currentCategory: {}
    }
  },
  created() {
    this.currentCategory = this.categories[0]
  },
  methods: {
    // 切换分类
    switchCategory(category) {
      this.currentCategory = category
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