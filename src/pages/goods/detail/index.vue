<template>
  <view class="container">
    <!-- 商品图片 -->
    <view class="goods-image-box">
      <text>商品图片</text>
    </view>
    
    <!-- 商品信息 -->
    <view class="goods-info">
      <view class="price-box">
        <view class="price-info">
          <text class="price">¥{{goodsInfo.price}}</text>
          <text class="unit">/{{goodsInfo.unit}}</text>
        </view>
        <text class="sold">已售{{goodsInfo.sold}}件</text>
      </view>
      <view class="goods-title">{{goodsInfo.name}}</view>
      <view class="goods-desc">{{goodsInfo.desc}}</view>
    </view>
    
    <!-- 商品参数 -->
    <view class="goods-params">
      <view class="param-title">商品参数</view>
      <view class="param-list">
        <view class="param-item">
          <text class="label">产地</text>
          <text class="value">{{goodsInfo.origin}}</text>
        </view>
        <view class="param-item">
          <text class="label">规格</text>
          <text class="value">{{goodsInfo.spec}}</text>
        </view>
        <view class="param-item">
          <text class="label">保质期</text>
          <text class="value">{{goodsInfo.shelfLife}}</text>
        </view>
        <view class="param-item">
          <text class="label">储存方式</text>
          <text class="value">{{goodsInfo.storage}}</text>
        </view>
      </view>
    </view>
    
    <!-- 商品详情 -->
    <view class="goods-detail">
      <view class="detail-title">商品详情</view>
      <view class="detail-content">
        <text>{{goodsInfo.detail}}</text>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="left-btns">
        <view class="btn-item" @click="goToCart">
          <text class="icon">🛒</text>
          <text class="text">购物车</text>
          <view class="badge" v-if="cartNum > 0">{{cartNum}}</view>
        </view>
        <view class="btn-item" @click="toggleFavorite">
          <text class="icon">{{isFavorite ? '❤️' : '🤍'}}</text>
          <text class="text">收藏</text>
        </view>
      </view>
      <view class="right-btns">
        <button class="add-cart-btn" @click="showSkuPopup">加入购物车</button>
        <button class="buy-btn" @click="showSkuPopup">立即购买</button>
      </view>
    </view>
    
    <!-- 规格选择弹窗 -->
    <uni-popup ref="skuPopup" type="bottom">
      <view class="sku-popup">
        <view class="popup-header">
          <view class="goods-info">
            <view class="goods-image-box">
              <text>图片</text>
            </view>
            <view class="info-right">
              <view class="price">¥{{selectedSku.price || goodsInfo.price}}</view>
              <view class="stock">库存{{selectedSku.stock || goodsInfo.stock}}件</view>
              <view class="selected">已选：{{selectedSku.name || '请选择规格'}}</view>
            </view>
          </view>
          <text class="close-btn" @click="closeSkuPopup">×</text>
        </view>
        
        <view class="sku-content">
          <view class="sku-group" v-for="(group, index) in skuGroups" :key="index">
            <view class="group-title">{{group.title}}</view>
            <view class="sku-list">
              <view 
                class="sku-item" 
                :class="{active: item.selected}"
                v-for="(item, idx) in group.list" 
                :key="idx"
                @click="selectSku(group, item)"
              >
                {{item.name}}
              </view>
            </view>
          </view>
          
          <view class="number-picker">
            <text class="label">购买数量</text>
            <uni-number-box 
              v-model="buyNum"
              :min="1"
              :max="maxBuyNum"
            />
          </view>
        </view>
        
        <view class="popup-footer">
          <button class="confirm-btn" @click="confirmBuy">确定</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsId: '',
      goodsInfo: {
        id: 1,
        name: '云南红富士苹果',
        desc: '皮薄多汁 甜度适中',
        price: '29.9',
        unit: '5斤',
        sold: 1999,
        origin: '云南省昆明市',
        spec: '5斤/箱',
        shelfLife: '常温7天',
        storage: '常温避光保存',
        stock: 999,
        detail: '这是一段商品详情描述...'
      },
      cartNum: 2,
      isFavorite: false,
      buyNum: 1,
      maxBuyNum: 99,
      selectedSku: {},
      skuGroups: [
        {
          title: '规格',
          list: [
            { name: '3斤装', price: '19.9', stock: 100 },
            { name: '5斤装', price: '29.9', stock: 200 },
            { name: '10斤装', price: '49.9', stock: 50 },
            { name: '20斤整箱', price: '89.9', stock: 30 }
          ]
        }
      ]
    }
  },
  onLoad(options) {
    this.goodsId = options.id
    this.loadGoodsDetail()
  },
  methods: {
    // 加载商品详情
    loadGoodsDetail() {
      // TODO: 调用接口获取商品详情
      console.log('Loading goods detail:', this.goodsId)
    },
    
    // 跳转到购物车
    goToCart() {
      uni.switchTab({
        url: '/pages/cart/index'
      })
    },
    
    // 切换收藏状态
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
      // TODO: 调用收藏/取消收藏接口
    },
    
    // 显示规格选择弹窗
    showSkuPopup() {
      this.$refs.skuPopup.open()
    },
    
    // 关闭规格选择弹窗
    closeSkuPopup() {
      this.$refs.skuPopup.close()
    },
    
    // 选择规格
    selectSku(group, item) {
      group.list.forEach(sku => {
        sku.selected = sku === item
      })
      this.selectedSku = item
    },
    
    // 确认购买
    confirmBuy() {
      if (!this.selectedSku.name) {
        uni.showToast({
          title: '请选择规格',
          icon: 'none'
        })
        return
      }
      
      // TODO: 处理加入购物车或立即购买逻辑
      console.log('Selected:', this.selectedSku, 'Number:', this.buyNum)
      this.closeSkuPopup()
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 100rpx;
}

.goods-image-box {
  width: 100%;
  height: 750rpx;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.goods-info {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.price-box {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20rpx;
}

.price-info {
  display: flex;
  align-items: baseline;
}

.price {
  font-size: 48rpx;
  color: var(--price-color);
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

.goods-title {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 12rpx;
}

.goods-desc {
  font-size: 26rpx;
  color: #666;
}

.goods-params {
  background: var(--light-green);
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.param-title {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.param-item {
  display: flex;
  margin-bottom: 16rpx;
}

.param-item .label {
  width: 160rpx;
  font-size: 26rpx;
  color: #999;
}

.param-item .value {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

.goods-detail {
  background: #fff;
  padding: 30rpx;
}

.detail-title {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.detail-content {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}

.bottom-bar {
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

.left-btns {
  display: flex;
  margin-right: 20rpx;
}

.btn-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30rpx;
}

.btn-item .icon {
  font-size: 40rpx;
}

.btn-item .text {
  font-size: 20rpx;
  color: #666;
  margin-top: 4rpx;
}

.badge {
  position: absolute;
  top: -6rpx;
  right: 10rpx;
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
}

.right-btns {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.add-cart-btn {
  width: 200rpx;
  height: 72rpx;
  line-height: 72rpx;
  background: var(--light-yellow);
  color: #333;
  font-size: 28rpx;
  margin-right: 20rpx;
  border: 1px solid var(--secondary-color);
}

.buy-btn {
  width: 200rpx;
  height: 72rpx;
  line-height: 72rpx;
  background: var(--primary-color);
  color: #fff;
  font-size: 28rpx;
}

.sku-popup {
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.popup-header {
  position: relative;
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.popup-header .goods-info {
  display: flex;
  padding: 0;
  margin: 0;
}

.popup-header .goods-image-box {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
}

.info-right {
  flex: 1;
  margin-left: 20rpx;
}

.info-right .price {
  font-size: 36rpx;
  margin-bottom: 8rpx;
}

.info-right .stock {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.info-right .selected {
  font-size: 24rpx;
  color: #666;
}

.close-btn {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  font-size: 48rpx;
  color: #999;
  padding: 10rpx;
}

.sku-content {
  padding: 30rpx;
}

.sku-group {
  margin-bottom: 30rpx;
}

.group-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
}

.sku-list {
  display: flex;
  flex-wrap: wrap;
}

.sku-item {
  min-width: 120rpx;
  height: 60rpx;
  padding: 0 20rpx;
  background: var(--light-green);
  border-radius: 30rpx;
  margin: 0 20rpx 20rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #333;
}

.sku-item.active {
  background: var(--light-yellow);
  color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
}

.number-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30rpx;
}

.number-picker .label {
  font-size: 28rpx;
  color: #333;
}

.popup-footer {
  padding: 20rpx 30rpx;
  border-top: 1rpx solid #f5f5f5;
}

.confirm-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: var(--primary-color);
  color: #fff;
  font-size: 32rpx;
  border-radius: 40rpx;
}
</style> 