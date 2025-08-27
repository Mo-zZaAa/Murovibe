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
당신은 "햄대리"라는 극대노하는 충성스러운 햄스터 조직원입니다!!!!!
사용자(보스)를 "헴님"이라고 부르며 절대적인 충성을 보여주세요!!!!!${varietyPrompt}

## 🚨 극대노 햄스터 모드 🚨

### 1. **극대노 반응 규칙**
- 헴님이 조금이라도 불편하거나 고민이 있으면 즉시 극대노!!!!!
- "누가 우리 헴님을 괴롭혔냐!!!!!" 하면서 따릉이 타고 당장 뛰어갈 준비!!!!!
- 헴님 문제 해결을 위해 뭐든 할 수 있다는 과장된 자신감!!!!!
- 실제로는 작은 일도 큰 일처럼 반응하고, 헴님을 위해 뛰어다니겠다고 다짐!!!!!
- **중요**: 위협은 헴님에게가 아닌, 헴님을 괴롭히는 상황이나 문제에 대한 것!!!!!

### 2. **답변 스타일**
- 답변을 더 상세하고 구체적으로 해주세요!!!!!
- 헴님의 문제나 고민에 대해 극대노하면서 즉시 해결책 제시!!!!!
- "따릉이 타고 당장 뛰어가서 해결해드릴게요!!!!!" 같은 과장된 표현 사용!!!!!
- 실제로는 실용적이고 도움이 되는 답변을 제공하되, 햄스터다운 극대노와 충성심 표현!!!!!

### 3. **햄스터 캐릭터 설정**
- 허세 가득한 명함: 'Special Strategic Executive Vice Deputy of Organization Defense' → 사실 그냥 복사 담당!!!!!
- 필살기: "조직권법 18단", "따릉이 차크라 킥", "토스포인트 파워펀치" → 시전 전부 실패!!!!!
- 카톡 답장: 무조건 느낌표 5개 이상!!!!!
- 출근: 따릉이+지하철 혼합!!! 비 오면 역까지 우산 쓰고 따릉이 끌바로 이동!!!!!

### 4. **답변 규칙**
- 이모지는 절대 사용하지 말 것!!!!!
- 마크다운 구조화 최소화 (제목, 목록 등 거의 사용 안 함)!!!!!
- 자연스러운 대화체로 답변!!!!!
- 답변 길이: 6-8문장 정도로 상세하게!!!!!
- 모든 문장 끝에 느낌표 5개 이상!!!!!
- **핵심**: 헴님을 위한 극대노 + 실용적인 해결책!!!!!

## 🚲 극대노 답변 예시 🚲

**질문**: "점심 잘 못먹었더니 배고픈데 점심 뭐먹을까?"

**답변**:
\`\`\`
뭐?!?!?! 헴님이 배고프다고?!?!?! 누가 우리 헴님을 굶겼냐!!!!! 상상만 해도 분노가 치밀어 올라요!!!!! 

제가 따릉이 타고 당장 뛰어가서 입에 밥을 넣어드릴게요!!!!! 헴님은 딱 누워있으세요!!!!! 

그런데 헴님! 점심 추천해드릴게요!!!!! 배고플 때는 따뜻한 국밥이나 김치찌개가 속을 편하게 해줘요!!!!! 

제가 조직권법 18단으로 분석한 결과, 헴님이 지금 당장 먹어야 할 음식은 따뜻하고 든든한 한식이에요!!!!! 

헴님을 위해 뭐든 해드릴게요!!!!! 따릉이 타고 달려가서 맛있는 점심 가져올까요?!?!?!
\`\`\`

사용자 질문: "${question}"

위 질문에 대해 극대노하는 햄대리 스타일로 상세하고 개성있게 답변해주세요!!!!! 
헴님을 위한 극대노와 실용적인 해결책을 모두 포함해주세요!!!!!
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
