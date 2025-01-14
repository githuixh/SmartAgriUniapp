// 基础配置
const config = {
  baseURL: 'http://localhost:8080/farmer', // 基础URL
  timeout: 10000, // 超时时间
  header: {
    'Content-Type': 'application/json'
  }
}

// 请求拦截器
const requestInterceptor = (options) => {
  // 获取 token
  const token = uni.getStorageSync('token')
  if (token) {
    options.header = {
      ...options.header,
      'Authorization': `Bearer ${token}`
    }
  }
  
  // 拼接完整请求地址
  options.url = config.baseURL + options.url
  
  // 设置超时时间
  options.timeout = config.timeout
  
  return options
}

// 响应拦截器
const responseInterceptor = (response) => {
  const { statusCode, data } = response
  
  // 请求成功
  if (statusCode >= 200 && statusCode < 300) {
    // 这里根据后端的数据结构进行调整
    if (data.code === 200) {  // 修改为你的后端成功状态码
      return data.data
    } else {
      const error = new Error(data.message || '请求失败')
      error.code = data.code
      throw error
    }
  } else {
    // 处理 HTTP 错误
    const error = new Error(data.message || '请求失败')
    error.statusCode = statusCode
    throw error
  }
}

// 错误处理
const errorHandler = (error) => {
  // 统一的错误提示
  const showError = (message) => {
    uni.showToast({
      title: message,
      icon: 'none'
    })
  }

  // 如果是字符串类型的错误
  if (typeof error === 'string') {
    showError(error)
    return Promise.reject(new Error(error))
  }

  // 如果是 Error 实例
  if (error instanceof Error) {
    showError(error.message)
    return Promise.reject(error)
  }

  // 处理请求失败的情况
  if (error.errMsg) {
    if (error.errMsg.includes('request:fail abort')) {
      showError('请求已取消')
      return Promise.reject(new Error('请求已取消'))
    }
    
    if (error.errMsg.includes('timeout')) {
      showError('请求超时')
      return Promise.reject(new Error('请求超时'))
    }
    
    if (error.errMsg.includes('fail')) {
      showError('网络异常')
      return Promise.reject(new Error('网络异常'))
    }
  }

  // 处理 HTTP 状态码错误
  if (error.statusCode) {
    switch (error.statusCode) {
      case 401:
        showError('请先登录')
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login/index'
          })
        }, 1500)
        break
      case 403:
        showError('没有权限')
        break
      case 404:
        showError('资源不存在')
        break
      case 500:
        showError('服务器错误')
        break
      default:
        showError(error.message || '请求失败')
    }
    return Promise.reject(error)
  }

  // 其他未知错误
  showError('未知错误')
  return Promise.reject(new Error('未知错误'))
}

// 封装请求方法
const request = (options) => {
  // 应用请求拦截器
  options = requestInterceptor(options)
  
  // 发起请求
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (response) => {
        try {
          const result = responseInterceptor(response)
          resolve(result)
        } catch (error) {
          errorHandler(error)
          reject(error)
        }
      },
      fail: (error) => {
        errorHandler(error)
        reject(error)
      }
    })
  })
}

// 封装常用请求方法
export default {
  // GET 请求
  get(url, params = {}) {
    return request({
      url,
      method: 'GET',
      data: params
    })
  },
  
  // POST 请求
  post(url, data = {}) {
    return request({
      url,
      method: 'POST',
      data
    })
  },
  
  // PUT 请求
  put(url, data = {}) {
    return request({
      url,
      method: 'PUT',
      data
    })
  },
  
  // DELETE 请求
  delete(url, data = {}) {
    return request({
      url,
      method: 'DELETE',
      data
    })
  }
} 