<template>
  <view class="address-container">
    <!-- 地址列表 -->
    <view class="address-list" v-if="addressList.length > 0">
      <view class="address-item" v-for="(item, index) in addressList" :key="index">
        <view class="info-section" @click="handleSelect(item)">
          <view class="user-info">
            <text class="name">{{item.name}}</text>
            <text class="phone">{{item.phone}}</text>
            <text class="tag" v-if="item.isDefault">默认</text>
          </view>
          <view class="address-detail">
            {{item.province}}{{item.city}}{{item.district}}{{item.detail}}
          </view>
        </view>
        <view class="action-section">
          <view class="action-btn" @click="handleEdit(item)">
            <text class="icon">✎</text>
            <text>编辑</text>
          </view>
          <view class="action-btn" @click="handleDelete(item)">
            <text class="icon">🗑</text>
            <text>删除</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <text>暂无收货地址</text>
    </view>
    
    <!-- 底部按钮 -->
    <view class="footer">
      <button class="add-btn" @click="handleAdd">新增收货地址</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      addressList: [
        {
          id: 1,
          name: '张三',
          phone: '13800138000',
          province: '广东省',
          city: '深圳市',
          district: '南山区',
          detail: '科技园南路88号',
          isDefault: true
        }
      ]
    }
  },
  onLoad(options) {
    console.log('地址列表页面加载', options)
  },
  onShow() {
    console.log('地址列表页面显示')
  },
  methods: {
    handleSelect(address) {
      // 如果是从其他页面跳转来选择地址的，则返回地址数据
      const pages = getCurrentPages()
      const prevPage = pages[pages.length - 2]
      if (prevPage && prevPage.route.includes('order')) {
        uni.navigateBack({
          success: () => {
            prevPage.$vm.setAddress(address)
          }
        })
      }
    },
    
    handleEdit(address) {
      uni.navigateTo({
        url: `/pages/address/edit/index?id=${address.id}`
      })
    },
    
    handleDelete(address) {
      uni.showModal({
        title: '提示',
        content: '确定要删除该地址吗？',
        success: (res) => {
          if (res.confirm) {
            const index = this.addressList.findIndex(item => item.id === address.id)
            if (index > -1) {
              this.addressList.splice(index, 1)
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              })
            }
          }
        }
      })
    },
    
    handleAdd() {
      uni.navigateTo({
        url: '/pages/address/edit/index'
      })
    }
  }
}
</script>

<style>
.address-container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 120rpx;
}

.address-list {
  padding: 20rpx;
}

.address-item {
  background: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 30rpx;
}

.info-section {
  padding-bottom: 20rpx;
}

.user-info {
  margin-bottom: 16rpx;
}

.name {
  font-size: 32rpx;
  font-weight: 500;
  margin-right: 20rpx;
}

.phone {
  font-size: 28rpx;
  color: #666;
}

.tag {
  font-size: 20rpx;
  color: #ff4d4f;
  border: 1rpx solid #ff4d4f;
  padding: 2rpx 12rpx;
  border-radius: 16rpx;
  margin-left: 16rpx;
}

.address-detail {
  font-size: 28rpx;
  color: #333;
  line-height: 1.4;
}

.action-section {
  display: flex;
  justify-content: flex-end;
  padding-top: 20rpx;
  border-top: 1rpx solid #eee;
}

.action-btn {
  display: flex;
  align-items: center;
  margin-left: 40rpx;
  font-size: 28rpx;
  color: #666;
}

.action-btn .icon {
  font-size: 32rpx;
  margin-right: 8rpx;
}

.empty-state {
  padding-top: 200rpx;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.add-btn {
  background: var(--primary-color);
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.add-btn:active {
  opacity: 0.9;
}
</style> 