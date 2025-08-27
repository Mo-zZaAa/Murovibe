// API 클라이언트 설정 및 공용 함수들

export const API_CONFIG = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  GEMINI_API_URL: import.meta.env.VITE_GEMINI_API_URL,
  TIMEOUT: 30000, // 30초
};

export const validateApiKey = () => {
  if (!API_CONFIG.GEMINI_API_KEY) {
    throw new Error('Gemini API 키가 설정되지 않았습니다.');
  }
  return true;
};

export const createApiError = (message, status = null) => ({
  message,
  status,
  timestamp: new Date().toISOString(),
});

export const handleApiError = (error) => {
  console.error('API 오류:', error);
  
  if (error.name === 'AbortError') {
    return createApiError('요청이 취소되었습니다.');
  }
  
  if (error.message.includes('network')) {
    return createApiError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
  }
  
  if (error.message.includes('timeout')) {
    return createApiError('요청 시간이 초과되었습니다. 다시 시도해주세요.');
  }
  
  return createApiError(error.message || '알 수 없는 오류가 발생했습니다.');
};
