import request from '@/utils/request'

// 用户相关接口
export const userApi = {
  // 登录
  login: (data) => request.post('/user/login', data),
  // 获取用户信息
  getUserInfo: () => request.get('/user/info')
}

// 商品相关接口
export const goodsApi = {
  // 获取商品列表
  getGoodsList: (params) => request.get('/goods/list', params),
  // 获取商品详情
  getGoodsDetail: (id) => request.get(`/goods/detail/${id}`)
}

// 活动相关接口
export const activityApi = {
  // 获取活动列表
  getActivityList: (params) => request.get('/activity/list', params),
  // 获取活动详情
  getActivityDetail: (id) => request.get(`/activity/detail/${id}`)
}

// 分类相关接口
export const categoryApi = {
  // 获取分类列表
  getCategoryList: () => request.get('/categories/cli-list'),
  // 获取分类详情
  getCategoryDetail: (id) => request.get(`/category/detail/${id}`)
} 