// 需要登录才能访问的页面路径
const AUTH_PAGES = [
  '/pages/user/index',
  '/pages/address/list/index',
  '/pages/address/edit/index',
  '/pages/order/list/index'
]

// 判断是否需要登录
export const needAuth = (url) => {
  return AUTH_PAGES.some(page => url.startsWith(page))
}

// 检查登录状态
export const checkLogin = () => {
  const token = uni.getStorageSync('token')
  return !!token
}

// 跳转登录页面
export const goLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index'
  })
} 