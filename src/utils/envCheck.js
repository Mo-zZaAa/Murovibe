// 환경변수 확인 유틸리티
export const checkEnvironmentVariables = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = import.meta.env.VITE_GEMINI_API_URL;
  
  console.log('🔍 환경변수 확인:');
  console.log('VITE_GEMINI_API_KEY:', apiKey ? '✅ 설정됨' : '❌ 설정되지 않음');
  console.log('VITE_GEMINI_API_URL:', apiUrl || '❌ 설정되지 않음');
  
  if (!apiKey) {
    console.error('❌ VITE_GEMINI_API_KEY가 설정되지 않았습니다!');
    console.log('📝 설정 방법:');
    console.log('1. 로컬: .env.local 파일에 VITE_GEMINI_API_KEY=your_key 추가');
    console.log('2. Netlify: Site settings → Environment variables에서 설정');
  }
  
  return {
    apiKey: !!apiKey,
    apiUrl: !!apiUrl
  };
};
