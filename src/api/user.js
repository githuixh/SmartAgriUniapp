import request from '@/utils/request'

export default {
  // 手机号登录
  login(data) {
    return request.post('/user/login', data)
  },
  // 微信登录
  wxLogin(data) {
    return request.post('/user/wx-login', data)
  }
} 