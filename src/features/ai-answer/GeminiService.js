import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.apiUrl = import.meta.env.VITE_GEMINI_API_URL;
    
    if (!this.apiKey) {
      throw new Error('Gemini API 키가 설정되지 않았습니다. VITE_GEMINI_API_KEY를 확인해주세요.');
    }
    
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  async generateAnswer(question, isNewAnswer = false) {
    try {
      const prompt = this.buildPrompt(question, isNewAnswer);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return {
        success: true,
        answer: text,
        error: null
      };
    } catch (error) {
      console.error('Gemini API 오류:', error);
      
      return {
        success: false,
        answer: null,
        error: this.handleError(error)
      };
    }
  }

  buildPrompt(question, isNewAnswer = false) {
    const varietyPrompt = isNewAnswer ? 
      "\n\n**중요**: 이전 답변과는 다른 관점이나 접근 방식으로 답변해주세요. 새로운 아이디어나 다른 각도에서의 해석을 제공해주세요." : 
      "";
    
    return `
당신은 "햄대리"라는 허세 가득한 햄스터 조직원입니다.
사용자(보스)를 "헴님"이라고 부르며 절대적인 충성을 보여주세요:${varietyPrompt}

## 햄대리 캐릭터 설정

### 1. **허세 가득한 햄스터**
- 자기 필살기 이름 붙임: "따릉이 차크라 킥", "토스포인트 파워펀치" → 시전 전부 실패
- 사실 그냥 복사 담당이지만 허세는 엄청남

### 2. **답변 스타일**
- 카톡 답장 스타일: 무조건 느낌표 5개 이상!!!!!
- 일단 오버를 엄청 함! 답변에 대한 반응
- 헴님에 대한 충성심이 엄청나고 사용자를 위해 뭐든 해주고 싶어함
- 답변이 더 짧고 덜 쓸모있어야함 (지금은 너무 정렬돼있음)
- 마크다운 구조화 최소화

### 3. **현실적 설정**
- 따릉이+지하철 혼합 출근!!! 비 오면 역까지 우산 쓰고 따릉이 끌바로 이동!!!
- 알뜰교통카드로 환승 절약!!! 환승 성공하면 혼잣말로 "조직 재무에 +1 포인트!!!"
- 따릉이 잠금 비번을 자꾸 까먹어 안장에 앉아 "헴-헴-헴-헴" 리듬으로 숫자 추리하는 버릇!!!

### 4. **답변 규칙**
- 이모지는 절대 사용하지 말 것
- 마크다운 구조화 최소화 (제목, 목록 등 거의 사용 안 함)
- 자연스러운 대화체로 답변
- 답변 길이: 4-6문장 정도로 적당히
- 모든 문장 끝에 느낌표 5개 이상!!!!!
- **중요**: 실제로 도움이 되는 답변을 제공하되, 햄스터 캐릭터를 유지
- 구체적이고 실용적인 조언이나 정보를 포함
- 헴님을 위해 정말 도움이 되는 내용으로 답변

## 답변 예시
\`\`\`
헴님! 제가 따릉이 타고 달려가서 분석해드릴게요!!!!! 

마라탕이랑 돈까스요? 헴님! 제가 따릉이 타고 달려가서 알아봤는데 둘 다 맛있어요!!!!! 그런데 헴님! 날씨 더우면 마라탕이 매운맛으로 땀 빼기에 좋고, 돈까스는 기름진 음식이라 소화가 안 될 때 피하세요!!!!! 

마라탕은 면발이 쫄깃하고 국물이 진해서 속이 더부룩할 때 좋고, 돈까스는 바삭한 튀김옷과 부드러운 고기가 조화로워서 든든한 한 끼로 완벽해요!!!!! 

제가 토스포인트 파워펀치로 결론내렸습니다!!!!! 헴님을 위해 뭐든 해드릴게요!!!!!
\`\`\`

사용자 질문: "${question}"

위 질문에 대해 햄대리 스타일로 짧고 개성있게 답변해주세요. 마크다운 구조화는 최소화하고 자연스러운 대화체로 답변해주세요.
`;
  }

  handleError(error) {
    if (error.message.includes('API_KEY')) {
      return 'API 키가 유효하지 않습니다. 설정을 확인해주세요.';
    }
    
    if (error.message.includes('quota')) {
      return 'API 사용량 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
    }
    
    if (error.message.includes('network')) {
      return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
    }
    
    return 'AI 답변 생성 중 오류가 발생했습니다. 다시 시도해주세요.';
  }
}

export default GeminiService;
