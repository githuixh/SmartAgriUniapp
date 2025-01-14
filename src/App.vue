<script>
import { needAuth, checkLogin, goLogin } from '@/utils/auth'

export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  onPageNotFound() {
    uni.switchTab({
      url: '/pages/index/index'
    })
  },
}

// 添加全局导航守卫
uni.addInterceptor('navigateTo', {
  invoke(e) {
    if (needAuth(e.url) && !checkLogin()) {
      goLogin()
      return false
    }
    return true
  }
})

uni.addInterceptor('switchTab', {
  invoke(e) {
    if (needAuth(e.url) && !checkLogin()) {
      goLogin()
      return false
    }
    return true
  }
})
</script>

<style>
page {
  background-color: #f8f8f8;
  /* 定义全局变量 */
  --primary-color: #4CAF50; /* 主题色：清新绿 */
  --secondary-color: #FFC107; /* 辅助色：温暖黄 */
  --light-green: #E8F5E9; /* 浅绿背景 */
  --light-yellow: #FFF8E1; /* 浅黄背景 */
  --price-color: #FF6B35; /* 价格颜色：暖橙色 */
}

/* 全局按钮样式 */
.primary-btn {
  background: var(--primary-color);
  color: #fff;
}

.secondary-btn {
  background: var(--secondary-color);
  color: #333;
}
</style>
