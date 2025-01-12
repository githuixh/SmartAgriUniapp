<template>
  <view class="container">
    <!-- 筛选栏 -->
    <view class="filter-bar">
      <view class="filter-item" :class="{active: sortType === 'default'}" @click="changeSort('default')">
        <text>综合</text>
      </view>
      <view class="filter-item" :class="{active: sortType === 'sales'}" @click="changeSort('sales')">
        <text>销量</text>
      </view>
      <view class="filter-item" @click="changeSort('price')">
        <view class="price-text">
          <text>价格</text>
          <view class="price-arrows">
            <text class="arrow" :class="{active: sortType === 'price-asc'}">↑</text>
            <text class="arrow" :class="{active: sortType === 'price-desc'}">↓</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 商品列表 -->
    <view class="goods-list">
      <view class="goods-item" v-for="item in goodsList" :key="item.id" @click="goToDetail(item)">
        <view class="goods-image-box">
          <text>商品图片</text>
        </view>
        <view class="goods-info">
          <text class="goods-name">{{item.name}}</text>
          <text class="goods-desc">{{item.desc}}</text>
          <view class="goods-price-box">
            <view class="price-info">
              <text class="price">¥{{item.price}}</text>
              <text class="unit">/{{item.unit}}</text>
            </view>
            <text class="sold">已售{{item.sold}}件</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="goodsList.length === 0">
      <text>暂无商品</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      sortType: 'default', // default, sales, price-asc, price-desc
      goodsList: [
        {
          id: 1,
          name: '云南红富士苹果',
          desc: '皮薄多汁 甜度适中',
          price: '29.9',
          unit: '5斤',
          sold: 1999
        },
        {
          id: 2,
          name: '海南小台农芒果',
          desc: '香甜可口 细腻无丝',
          price: '39.9',
          unit: '3斤',
          sold: 999
        },
        {
          id: 3,
          name: '广西砂糖橘',
          desc: '酸甜可口 生态种植',
          price: '25.9',
          unit: '4斤',
          sold: 2999
        }
      ]
    }
  },
  onLoad(options) {
    const { type, title } = options
    // 设置页面标题
    if (title) {
      uni.setNavigationBarTitle({
        title
      })
    }
    // 加载商品列表
    this.loadGoodsList(type)
  },
  methods: {
    // 切换排序方式
    changeSort(type) {
      if (type === 'price') {
        // 价格排序特殊处理
        if (this.sortType === 'price-asc') {
          this.sortType = 'price-desc'
        } else {
          this.sortType = 'price-asc'
        }
      } else {
        this.sortType = type
      }
      this.loadGoodsList()
    },
    
    // 加载商品列表
    loadGoodsList(type) {
      // 根据类型加载不同的商品列表
      switch(type) {
        case 'fruit':
          this.goodsList = [
            {
              id: 1,
              name: '云南红富士苹果',
              desc: '皮薄多汁 甜度适中',
              price: '29.9',
              unit: '5斤',
              sold: 1999
            },
            {
              id: 2,
              name: '海南小台农芒果',
              desc: '香甜可口 细腻无丝',
              price: '39.9',
              unit: '3斤',
              sold: 999
            }
          ]
          break
        case 'vegetable':
          this.goodsList = [
            {
              id: 3,
              name: '新鲜生菜',
              desc: '农家种植 绿色无污染',
              price: '9.9',
              unit: '500g',
              sold: 2999
            }
          ]
          break
        // 其他分类的商品数据...
      }
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
}

.filter-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 88rpx;
  background: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #eee;
}

.filter-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 28rpx;
  color: #666;
}

.filter-item.active {
  color: #07c160;
  font-weight: bold;
}

.price-text {
  display: flex;
  align-items: center;
}

.price-arrows {
  display: flex;
  flex-direction: column;
  margin-left: 4rpx;
}

.arrow {
  font-size: 20rpx;
  line-height: 1;
  color: #999;
}

.arrow.active {
  color: #07c160;
}

.goods-list {
  margin-top: 88rpx;
  padding: 20rpx;
}

.goods-item {
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.goods-image-box {
  width: 100%;
  height: 400rpx;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.goods-info {
  padding: 20rpx;
}

.goods-name {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

.goods-desc {
  font-size: 26rpx;
  color: #999;
  margin-top: 8rpx;
}

.goods-price-box {
  margin-top: 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-info {
  display: flex;
  align-items: baseline;
}

.price {
  font-size: 36rpx;
  color: #ff4d4f;
  font-weight: bold;
}

.unit {
  font-size: 24rpx;
  color: #999;
  margin-left: 4rpx;
}

.sold {
  font-size: 24rpx;
  color: #999;
}

.empty-state {
  padding-top: 200rpx;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}
</style> 