<template>
  <view class="container">
    <!-- 活动列表 -->
    <view class="activity-list">
      <view 
        class="activity-item" 
        v-for="(item, index) in activityList" 
        :key="index"
        @click="goToDetail(item)"
      >
        <view class="activity-image-box">
          <text>活动图片</text>
        </view>
        <view class="activity-content">
          <view class="activity-info">
            <text class="title">{{item.title}}</text>
            <text class="desc">{{item.desc}}</text>
          </view>
          <view class="activity-data">
            <view class="time-info">
              <text class="label">活动时间</text>
              <text class="time">{{item.startTime}} - {{item.endTime}}</text>
            </view>
            <view class="status" :class="item.status">{{item.statusText}}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="activityList.length === 0">
      <text>暂无活动</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activityList: [
        {
          id: 1,
          title: '当季水果特惠',
          desc: '精选应季水果，产地直供，品质保证',
          startTime: '2024-03-01',
          endTime: '2024-03-15',
          status: 'ongoing',
          statusText: '进行中'
        },
        {
          id: 2,
          title: '春季果蔬节',
          desc: '新鲜时令蔬果，全场8折起',
          startTime: '2024-03-20',
          endTime: '2024-04-05',
          status: 'upcoming',
          statusText: '即将开始'
        },
        {
          id: 3,
          title: '产地直采周',
          desc: '来自全国各地的特色农产品',
          startTime: '2024-02-15',
          endTime: '2024-02-28',
          status: 'ended',
          statusText: '已结束'
        }
      ]
    }
  },
  methods: {
    goToDetail(activity) {
      uni.navigateTo({
        url: `/pages/activity/detail/index?id=${activity.id}`
      })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
  padding: 20rpx;
}

.activity-list {
  padding-bottom: 20rpx;
}

.activity-item {
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.activity-image-box {
  width: 100%;
  height: 300rpx;
  background: var(--light-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.activity-content {
  padding: 20rpx;
}

.activity-info {
  margin-bottom: 20rpx;
}

.title {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.4;
}

.activity-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20rpx;
  border-top: 1rpx solid #f5f5f5;
}

.time-info {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 4rpx;
}

.time {
  font-size: 24rpx;
  color: #666;
}

.status {
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.status.ongoing {
  background: var(--light-green);
  color: var(--primary-color);
}

.status.upcoming {
  background: var(--light-yellow);
  color: var(--secondary-color);
}

.status.ended {
  background: #f5f5f5;
  color: #999;
}

.empty-state {
  padding-top: 200rpx;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}
</style> 