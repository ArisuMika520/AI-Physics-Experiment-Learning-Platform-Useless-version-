const config = {
  development: {
    baseURL: '',
    quiz: {
      questions: '/quiz/questions',
      submit: '/quiz/submit'
    }
  },
  
  production: {
    baseURL: '',
    quiz: {
      questions: '/quiz/questions',
      submit: '/quiz/submit'
    }
  },
  
  test: {
    baseURL: '',
    quiz: {
      questions: '/quiz/questions',
      submit: '/quiz/submit'
    }
  }
}

// 根据环境获取配置
const getConfig = () => {
  // 这里可以根据实际环境变量或小程序配置来返回不同的配置
  // 目前默认使用测试环境配置
  return config.test
}

// 导出配置
export const apiConfig = getConfig()

export default apiConfig