export const CozeAPIConfig = {
  // API基础配置
  baseURL: 'https://api.coze.cn/v3/chat',
  
  authorization: 'Bearer pat_NxDoMMDSsTunmIF9QCCT2sO6KddVvpPwJyuZ7fEv2qA0hDTYZg5o9kO57Supz9eH',
  
  botId: '7543573567435341839',
  
  userId: '123',
  
  requestConfig: {
    stream: false,
    auto_save_history: true,
    timeout: 30000 // 30秒超时
  },
  
  errorMessages: {
    networkError: '网络连接失败，请检查网络设置',
    apiError: 'AI服务暂时不可用，请稍后再试',
    timeoutError: '请求超时，请稍后再试',
    unknownError: '未知错误，请稍后再试'
  }
};

export interface CozeAPIRequest {
  bot_id: string;
  user_id: string;
  stream: boolean;
  auto_save_history: boolean;
  additional_messages: {
    role: 'user' | 'assistant';
    content: string;
    content_type: 'text';
  }[];
}

export interface CozeAPIResponse {
  messages: {
    role: 'user' | 'assistant';
    content: string;
    content_type: 'text';
  }[];
  conversation_id: string;
  code: number;
  msg: string;
}