<template>
  <view class="order-container">
    <!-- 订单状态标签 -->
    <scroll-view class="status-tabs" scroll-x>
      <view 
        class="tab-item" 
        v-for="(item, index) in statusList" 
        :key="index"
        :class="{ active: currentStatus === item.value }"
        @click="switchStatus(item.value)"
      >
        <text>{{item.label}}</text>
      </view>
    </scroll-view>
    
    <!-- 订单列表 -->
    <view class="order-list">
      <view class="order-item" v-for="(item, index) in orderList" :key="index">
        <view class="order-header">
          <text class="order-no">订单号：{{item.orderNo}}</text>
          <text class="order-status">{{item.statusText}}</text>
        </view>
        <view class="goods-list">
          <view class="goods-item" v-for="(goods, idx) in item.goodsList" :key="idx">
            <view class="goods-image">商品图片</view>
            <view class="goods-info">
              <text class="goods-name">{{goods.name}}</text>
              <text class="goods-spec">{{goods.spec}}</text>
              <view class="price-box">
                <text class="price">¥{{goods.price}}</text>
                <text class="num">x{{goods.num}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="order-footer">
          <view class="total">
            共{{item.totalNum}}件商品 合计：
            <text class="amount">¥{{item.totalAmount}}</text>
          </view>
          <view class="btn-group">
            <button 
              class="action-btn" 
              v-for="(btn, idx) in getActionButtons(item.status)"
              :key="idx"
              @click="handleAction(btn.action, item)"
            >
              {{btn.text}}
            </button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-if="orderList.length === 0">
      <text>暂无相关订单</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentStatus: 'all',
      statusList: [
        { label: '全部', value: 'all' },
        { label: '待付款', value: 'pending' },
        { label: '待发货', value: 'undelivered' },
        { label: '待收货', value: 'delivered' },
        { label: '已完成', value: 'completed' }
      ],
      orderList: [
        {
          id: 1,
          orderNo: 'DD20240301001',
          status: 'pending',
          statusText: '待付款',
          totalNum: 2,
          totalAmount: '59.8',
          goodsList: [
            {
              id: 1,
              name: '云南红富士苹果',
              spec: '5斤装',
              price: '29.9',
              num: 2
            }
          ]
        }
      ]
    }
  },
  methods: {
    switchStatus(status) {
      this.currentStatus = status
      // TODO: 根据状态获取订单列表
    },
    
    getActionButtons(status) {
      const btnMap = {
        pending: [
          { text: '取消订单', action: 'cancel' },
          { text: '立即付款', action: 'pay' }
        ],
        undelivered: [
          { text: '提醒发货', action: 'remind' }
        ],
        delivered: [
          { text: '确认收货', action: 'confirm' }
        ],
        completed: [
          { text: '删除订单', action: 'delete' },
          { text: '再次购买', action: 'rebuy' }
        ]
      }
      return btnMap[status] || []
    },
    
    handleAction(action, order) {
      // TODO: 处理订单操作
      uni.showToast({
        title: `${action}操作待实现`,
        icon: 'none'
      })
    }
  }
}
</script>

<style>
.order-container {
  min-height: 100vh;
  background: #f8f8f8;
}

.status-tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background: #fff;
  white-space: nowrap;
  border-bottom: 1rpx solid #f5f5f5;
}

.tab-item {
  display: inline-block;
  padding: 0 30rpx;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 28rpx;
  color: #333;
}

.tab-item.active {
  color: var(--primary-color);
  position: relative;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background: var(--primary-color);
  border-radius: 2rpx;
}

.order-list {
  margin-top: 108rpx;
  padding: 20rpx;
}

.order-item {
  background: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.order-no {
  font-size: 26rpx;
  color: #666;
}

.order-status {
  font-size: 26rpx;
  color: var(--primary-color);
}

.goods-list {
  padding: 20rpx 0;
}

.goods-item {
  display: flex;
  padding: 20rpx 0;
}

.goods-image {
  width: 160rpx;
  height: 160rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 24rpx;
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
  margin-bottom: 10rpx;
}

.goods-spec {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 10rpx;
}

.price-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 32rpx;
  color: var(--price-color);
  font-weight: bold;
}

.num {
  font-size: 24rpx;
  color: #999;
}

.order-footer {
  padding-top: 20rpx;
  border-top: 1rpx solid #f5f5f5;
}

.total {
  text-align: right;
  font-size: 26rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.amount {
  font-size: 32rpx;
  color: var(--price-color);
  font-weight: bold;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
}

.action-btn {
  margin-left: 20rpx;
  padding: 0 30rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 26rpx;
  color: #666;
  background: #fff;
  border: 1rpx solid #ddd;
  border-radius: 30rpx;
}

.action-btn:last-child {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.empty-state {
  padding-top: 300rpx;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}
</style> 