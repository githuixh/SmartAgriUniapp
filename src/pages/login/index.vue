<template>
  <view class="login-container">
    <!-- 顶部背景 -->
    <view class="login-bg">
      <view class="bg-pattern"></view>
      <image class="bg-image" src="/static/images/login-bg.jpg" mode="aspectFill" />
      <view class="welcome">
        <view class="welcome-content">
          <text class="title">Hi, 欢迎回来 👋</text>
          <text class="subtitle">让我们开始今天的购物之旅吧</text>
        </view>
      </view>
    </view>
    
    <!-- 登录表单 -->
    <view class="login-form">
      <view class="form-header">
        <text class="form-title">账号登录</text>
        <text class="form-desc">请使用手机号登录或微信一键登录</text>
      </view>
      <!-- 手机号输入 -->
      <view class="input-group">
        <view class="input-box">
          <text class="iconfont icon-phone"></text>
          <input 
            class="input" 
            type="number" 
            maxlength="11" 
            v-model="phone" 
            placeholder="请输入手机号"
          />
        </view>
      </view>
      
      <!-- 验证码输入 -->
      <view class="input-group">
        <view class="input-box">
          <text class="iconfont icon-safe"></text>
          <input 
            class="input" 
            type="number" 
            maxlength="6" 
            v-model="code" 
            placeholder="请输入验证码"
          />
          <button 
            class="code-btn" 
            :disabled="counting" 
            @click="sendCode"
          >
            {{counting ? `${count}s` : '获取验证码'}}
          </button>
        </view>
      </view>
      
      <!-- 登录按钮 -->
      <button class="login-btn" @click="handleLogin">
        <text class="btn-text">登录</text>
      </button>
      
      <!-- 其他登录方式 -->
      <view class="other-login">
        <view class="login-methods">
          <button 
            class="wx-login-btn" 
            @tap="getUserProfile"
          >
            <view class="wx-btn-content">
              <view class="wx-icon-wrap">
                <text class="iconfont icon-wechat"></text>
              </view>
              <text class="btn-text">微信一键登录</text>
            </view>
          </button>
        </view>
        <view class="divider">
          <text class="text">其他方式登录</text>
        </view>
      </view>
      
      <!-- 用户协议 -->
      <view class="agreement">
        <checkbox 
          :checked="agreed" 
          @tap="agreed = !agreed"
          color="var(--primary-color)"
        />
        <text class="agreement-text">
          登录即代表同意
          <text class="link">《用户协议》</text>
          和
          <text class="link">《隐私政策》</text>
        </text>
      </view>
    </view>
  </view>
</template>

<script>
import { userApi } from '@/api'

export default {
  data() {
    return {
      phone: '',
      code: '',
      counting: false,
      count: 60,
      agreed: false,
      timer: null
    }
  },
  mounted() {
    console.log('userApi:', userApi) // 检查 API 对象
  },
  methods: {
    // 发送验证码
    sendCode() {
      if (!this.phone) {
        return uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
      }
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        return uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        })
      }
      
      // 开始倒计时
      this.counting = true
      this.count = 60
      this.timer = setInterval(() => {
        if (this.count > 0) {
          this.count--
        } else {
          this.counting = false
          clearInterval(this.timer)
        }
      }, 1000)
      
      // TODO: 调用发送验证码接口
      uni.showToast({
        title: '验证码发送成功',
        icon: 'success'
      })
    },
    
    // 手机号登录
    async handleLogin() {
      if (!this.agreed) {
        return uni.showToast({
          title: '请先同意用户协议',
          icon: 'none'
        })
      }
      if (!this.phone || !this.code) {
        return uni.showToast({
          title: '请输入手机号和验证码',
          icon: 'none'
        })
      }
      
      try {
        const result = await userApi.login({
          phone: this.phone,
          code: this.code
        })
        
        // 保存登录信息
        uni.setStorageSync('token', result.token)
        uni.setStorageSync('userInfo', result.userInfo)
        
        uni.showToast({
          title: '登录成功',
          icon: 'success',
          success: () => {
            setTimeout(() => {
              const pages = getCurrentPages()
              if (pages.length > 1) {
                uni.navigateBack()
              } else {
                uni.switchTab({
                  url: '/pages/index/index'
                })
              }
            }, 1500)
          }
        })
      } catch (error) {
        console.error('登录失败:', error)
      }
    },
    
    // 获取用户信息
    async getUserProfile() {
      if (!this.agreed) {
        return uni.showToast({
          title: '请先同意用户协议',
          icon: 'none'
        })
      }
      
      try {
        // 1. 获取用户信息
        const { userInfo } = await uni.getUserProfile({
          desc: '用于完善会员资料'
        })
        
        // 2. 进行微信登录
        this.handleWxLogin(userInfo)
      } catch (error) {
        console.error('获取用户信息失败:', error)
        uni.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        })
      }
    },
    
    // 微信登录
    async handleWxLogin(userInfo) {
      try {
        // 获取微信登录凭证
        const { code } = await uni.login({
          provider: 'weixin'
        })

        // 将 code 发送到后端
        // const response = await uni.request({
        //   url: 'http://localhost:8080/wx/login',
        //   method: 'POST',
        //   data: { code }
        // });

        //console.log('后端返回:', response.data);
        
        console.log('微信登录凭证:', code)
        
        console.log('用户信息:', userInfo)
        
        // 临时使用模拟数据
        const mockResult = {
          token: 'mock_token_' + Date.now(),
          userInfo: {
            ...userInfo,
            id: 1
          }
        }
        
        // 保存登录信息
        uni.setStorageSync('token', mockResult.token)
        uni.setStorageSync('userInfo', mockResult.userInfo)
        
        uni.showToast({
          title: '登录成功',
          icon: 'success',
          success: () => {
            setTimeout(() => {
              const pages = getCurrentPages()
              if (pages.length > 1) {
                uni.navigateBack()
              } else {
                uni.switchTab({
                  url: '/pages/index/index'
                })
              }
            }, 1500)
          }
        })
      } catch (error) {
        console.error('微信登录失败:', error)
        uni.showToast({
          title: error.errMsg || '登录失败',
          icon: 'none'
        })
      }
    }
  },
  beforeDestroy() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style>
.login-container {
  min-height: 100vh;
  background: #f7f9fc;
}

.login-bg {
  position: relative;
  height: 460rpx;
  overflow: hidden;
  background: linear-gradient(135deg, #4CAF50, #2ecc71);
}

.bg-image {
  width: 100%;
  height: 100%;
  transform: scale(1.1);
  opacity: 0.15;
  mix-blend-mode: overlay;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
  opacity: 0.5;
}

.welcome {
  position: absolute;
  left: 40rpx;
  bottom: 80rpx;
  z-index: 2;
  width: 100%;
}

.welcome-content {
  position: relative;
  padding-left: 20rpx;
}

.welcome-content::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6rpx;
  height: 80%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 3rpx;
}

.welcome .title {
  font-size: 56rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
  display: block;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  letter-spacing: 2rpx;
}

.welcome .subtitle {
  font-size: 28rpx;
  opacity: 0.95;
  color: #fff;
  letter-spacing: 1rpx;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.login-form {
  position: relative;
  margin: -50rpx 30rpx 0;
  padding: 60rpx 40rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 30rpx rgba(0,0,0,0.05);
}

.form-header {
  margin-bottom: 60rpx;
  text-align: center;
}

.form-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.form-desc {
  font-size: 26rpx;
  color: #999;
}

.input-group {
  margin-bottom: 40rpx;
}

.input-box {
  display: flex;
  align-items: center;
  height: 100rpx;
  background: #f7f9fc;
  border-radius: 50rpx;
  padding: 0 40rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s;
}

.input-box:focus-within {
  border-color: var(--primary-color);
  background: #fff;
}

.input-box .iconfont {
  font-size: 40rpx;
  color: #bbb;
  margin-right: 20rpx;
}

.input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.code-btn {
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 30rpx;
  background: var(--primary-color);
  color: #fff;
  font-size: 24rpx;
  border-radius: 30rpx;
  opacity: 0.9;
}

.code-btn:active {
  opacity: 1;
}

.login-btn {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  background: linear-gradient(135deg, #4CAF50, #2ecc71);
  color: #fff;
  font-size: 32rpx;
  border-radius: 50rpx;
  margin: 60rpx 0;
  box-shadow: 0 8rpx 20rpx rgba(46,204,113,0.2);
  transition: all 0.3s;
}

.login-btn:active {
  transform: translateY(2rpx);
  box-shadow: 0 4rpx 8rpx rgba(46,204,113,0.3);
}

.other-login {
  margin-top: 80rpx;
}

.login-methods {
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;
}

.wx-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500rpx;
  height: 96rpx;
  background: #07c160;
  border-radius: 48rpx;
  padding: 0;
  border: none;
  transition: all 0.3s;
  box-shadow: 0 8rpx 16rpx rgba(7,193,96,0.2);
}

.wx-login-btn:active {
  transform: translateY(2rpx);
  box-shadow: 0 4rpx 8rpx rgba(7,193,96,0.2);
}

.wx-btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wx-icon-wrap {
  width: 48rpx;
  height: 48rpx;
  background: rgba(255,255,255,0.2);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16rpx;
}

.wx-login-btn .iconfont {
  font-size: 44rpx;
  color: #fff;
}

.wx-login-btn .btn-text {
  font-size: 28rpx;
  color: #fff;
  letter-spacing: 1rpx;
}

.divider {
  position: relative;
  text-align: center;
  margin-top: 60rpx;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1rpx;
  background: #e8e8e8;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider .text {
  display: inline-block;
  padding: 0 30rpx;
  font-size: 24rpx;
  color: #999;
  background: #fff;
}

.agreement {
  margin-top: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #666;
}

.agreement .link {
  color: var(--primary-color);
}
</style> 