<template>
  <view class="address-edit">
    <view class="form-group">
      <!-- 联系人 -->
      <view class="form-item">
        <text class="label">收货人</text>
        <input 
          class="input" 
          type="text" 
          v-model="formData.name" 
          placeholder="请输入收货人姓名"
        />
      </view>
      
      <!-- 手机号 -->
      <view class="form-item">
        <text class="label">手机号码</text>
        <input 
          class="input" 
          type="number" 
          maxlength="11" 
          v-model="formData.phone" 
          placeholder="请输入手机号码"
        />
      </view>
      
      <!-- 所在地区 -->
      <view class="form-item" @click="showRegionPicker">
        <text class="label">所在地区</text>
        <view class="region-picker">
          <text v-if="formData.region" class="region-text">
            {{formData.region}}
          </text>
          <text v-else class="placeholder">请选择所在地区</text>
          <text class="arrow">></text>
        </view>
      </view>
      
      <!-- 详细地址 -->
      <view class="form-item">
        <text class="label">详细地址</text>
        <textarea 
          class="textarea" 
          v-model="formData.detail" 
          placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等"
        />
      </view>
    </view>
    
    <!-- 设为默认 -->
    <view class="form-group">
      <view class="switch-item">
        <text>设为默认收货地址</text>
        <switch 
          :checked="formData.isDefault" 
          @change="handleDefaultChange" 
          color="#07c160"
        />
      </view>
    </view>
    
    <!-- 底部按钮 -->
    <view class="footer">
      <button class="save-btn" @click="handleSave">保存</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        region: '',
        detail: '',
        isDefault: false
      }
    }
  },
  methods: {
    showRegionPicker() {
      // 调用地区选择器
      uni.showToast({
        title: '选择地区功能开发中',
        icon: 'none'
      })
    },
    
    handleDefaultChange(e) {
      this.formData.isDefault = e.detail.value
    },
    
    handleSave() {
      // 表单验证
      if (!this.formData.name) {
        return uni.showToast({
          title: '请输入收货人姓名',
          icon: 'none'
        })
      }
      if (!this.formData.phone) {
        return uni.showToast({
          title: '请输入手机号码',
          icon: 'none'
        })
      }
      if (!this.formData.region) {
        return uni.showToast({
          title: '请选择所在地区',
          icon: 'none'
        })
      }
      if (!this.formData.detail) {
        return uni.showToast({
          title: '请输入详细地址',
          icon: 'none'
        })
      }
      
      // TODO: 保存地址
      uni.showToast({
        title: '保存成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        }
      })
    }
  }
}
</script>

<style>
.address-edit {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 120rpx;
}

.form-group {
  margin-top: 20rpx;
  background: #fff;
  padding: 0 30rpx;
}

.form-item {
  display: flex;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.form-item:last-child {
  border-bottom: none;
}

.label {
  width: 160rpx;
  font-size: 28rpx;
  color: #333;
  padding-top: 6rpx;
}

.input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.textarea {
  flex: 1;
  height: 160rpx;
  font-size: 28rpx;
  color: #333;
}

.region-picker {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.region-text {
  font-size: 28rpx;
  color: #333;
}

.placeholder {
  font-size: 28rpx;
  color: #999;
}

.arrow {
  color: #ccc;
  font-size: 28rpx;
}

.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
  font-size: 28rpx;
  color: #333;
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

.save-btn {
  background: var(--primary-color);
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.save-btn:active {
  opacity: 0.9;
}
</style> 