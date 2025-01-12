<template>
  <view class="search-container">
    <!-- 搜索头部 -->
    <view class="search-header">
      <view class="search-box">
        <text class="search-icon">🔍</text>
        <input 
          class="search-input" 
          type="text" 
          v-model="keyword"
          placeholder="搜索商品"
          confirm-type="search"
          @confirm="handleSearch"
          focus
        />
      </view>
      <text class="cancel-btn" @click="handleCancel">取消</text>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-section" v-if="historyList.length > 0 && !keyword">
      <view class="section-header">
        <text class="title">搜索历史</text>
        <text class="clear-btn" @click="clearHistory">清空</text>
      </view>
      <view class="history-list">
        <view 
          class="history-item" 
          v-for="(item, index) in historyList" 
          :key="index"
          @click="handleHistoryClick(item)"
        >
          {{item}}
        </view>
      </view>
    </view>
    
    <!-- 搜索结果 -->
    <view class="result-list" v-if="keyword">
      <view 
        class="result-item"
        v-for="(item, index) in searchResults"
        :key="index"
        @click="goToDetail(item)"
      >
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
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      historyList: [],
      searchResults: []
    }
  },
  onLoad() {
    // 获取搜索历史
    this.getSearchHistory()
  },
  methods: {
    // 处理搜索
    handleSearch() {
      if (!this.keyword.trim()) return
      
      // 保存搜索历史
      this.saveSearchHistory(this.keyword)
      
      // 模拟搜索结果
      this.searchResults = [
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
    },
    
    // 取消搜索
    handleCancel() {
      uni.navigateBack()
    },
    
    // 获取搜索历史
    getSearchHistory() {
      const history = uni.getStorageSync('searchHistory') || []
      this.historyList = history
    },
    
    // 保存搜索历史
    saveSearchHistory(keyword) {
      let history = uni.getStorageSync('searchHistory') || []
      // 去重
      if (!history.includes(keyword)) {
        history.unshift(keyword)
        // 最多保存10条
        history = history.slice(0, 10)
        uni.setStorageSync('searchHistory', history)
        this.historyList = history
      }
    },
    
    // 清空搜索历史
    clearHistory() {
      uni.showModal({
        title: '提示',
        content: '确定要清空搜索历史吗？',
        success: (res) => {
          if (res.confirm) {
            uni.removeStorageSync('searchHistory')
            this.historyList = []
          }
        }
      })
    },
    
    // 点击历史记录
    handleHistoryClick(keyword) {
      this.keyword = keyword
      this.handleSearch()
    },
    
    // 跳转到商品详情
    goToDetail(goods) {
      uni.navigateTo({
        url: `/pages/goods/detail?id=${goods.id}`
      })
    }
  }
}
</script>

<style>
.search-container {
  min-height: 100vh;
  background: #f8f8f8;
}

.search-header {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  height: 72rpx;
  background: #f5f5f5;
  border-radius: 36rpx;
  padding: 0 30rpx;
  margin-right: 20rpx;
}

.search-icon {
  font-size: 28rpx;
  color: #999;
  margin-right: 10rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.cancel-btn {
  font-size: 28rpx;
  color: #666;
  padding: 10rpx;
}

.history-section {
  margin-top: 20rpx;
  background: #fff;
  padding: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.title {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.clear-btn {
  font-size: 24rpx;
  color: #999;
  padding: 10rpx;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
}

.history-item {
  padding: 10rpx 30rpx;
  background: #f5f5f5;
  border-radius: 30rpx;
  margin: 10rpx;
  font-size: 24rpx;
  color: #666;
}

.result-list {
  background: #fff;
  margin-top: 20rpx;
}

.result-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.goods-image-box {
  width: 160rpx;
  height: 160rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
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
  color: #ff4d4f;
  font-weight: bold;
}

.sold {
  font-size: 24rpx;
  color: #999;
}
</style> 