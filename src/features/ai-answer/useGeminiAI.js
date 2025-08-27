import { useState, useCallback } from 'react';
import GeminiService from './GeminiService';

const useGeminiAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geminiService] = useState(() => new GeminiService());

  const generateAnswer = useCallback(async (question, isNewAnswer = false) => {
    if (!question.trim()) {
      setError('질문을 입력해주세요.');
      return { success: false, answer: null, error: '질문을 입력해주세요.' };
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await geminiService.generateAnswer(question, isNewAnswer);
      
      if (result.success) {
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = 'AI 답변 생성 중 예상치 못한 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, answer: null, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [geminiService]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    generateAnswer,
    isLoading,
    error,
    clearError,
    reset
  };
};

export default useGeminiAI;
