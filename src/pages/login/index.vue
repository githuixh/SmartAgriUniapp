<template>
  <view class="login-container">
    <view class="login-box">
      <view class="title">登录</view>
      <button class="wx-login-btn" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">
        微信一键登录
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleGetUserInfo() {
      // 模拟登录成功
      const mockUserInfo = {
        nickName: '测试用户',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        gender: 1,
        country: 'China',
        province: 'Guangdong',
        city: 'Shenzhen'
      }
      
      // 保存用户信息到本地存储
      uni.setStorageSync('userInfo', mockUserInfo)
      // 模拟保存token
      uni.setStorageSync('token', 'mock_token_123456')
      
      // 显示登录成功提示
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          // 延迟跳转到首页
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1500)
        }
      })
    }
  }
}
</script>

<style>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.login-box {
  width: 80%;
  padding: 40rpx;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
}

.wx-login-btn {
  background: #07c160;
  color: #fff;
  border-radius: 10rpx;
  margin-top: 30rpx;
}
</style> 