import React, { useState, useCallback } from 'react';
import { Card, Button, LoadingSpinner, HamsterTMI, HamsterProfile, HamsterRidingAnimation } from '@ui/';
import { useGeminiAI } from '@features/ai-answer';
import { useQuestionInput } from '@features/question-input';
import QuestionForm from './QuestionForm';
import AnswerDisplay from './AnswerDisplay';
import './HomePage.css';

const HomePage = () => {
  // AI 기능 훅 사용
  const { generateAnswer, isLoading: aiLoading, error: aiError, clearError: clearAiError } = useGeminiAI();
  
  // 질문 입력 훅 사용
  const { 
    question, 
    isValid, 
    validationMessage, 
    handleQuestionChange, 
    handleQuestionSubmit, 
    clearQuestion, 
    reset: resetQuestion 
  } = useQuestionInput();

  // 로컬 상태
  const [result, setResult] = useState('');
  const [localError, setLocalError] = useState(null);

  // 에러 상태 통합
  const error = aiError || localError;

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const submittedQuestion = handleQuestionSubmit();
    if (!submittedQuestion) {
      return;
    }

    try {
      const response = await generateAnswer(submittedQuestion);
      
      if (response.success) {
        setResult(response.answer);
        setLocalError(null);
        clearAiError();
      } else {
        setLocalError(response.error);
        setResult('');
      }
    } catch (err) {
      setLocalError('AI 답변 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      setResult('');
    }
  }, [generateAnswer, handleQuestionSubmit, clearAiError]);

  const handleNewQuestion = useCallback(() => {
    clearQuestion();
    setResult('');
    setLocalError(null);
    clearAiError();
  }, [clearQuestion, clearAiError]);

  const handleNewAnswer = useCallback(async () => {
    if (!question.trim()) {
      return;
    }

    try {
      const response = await generateAnswer(question, true); // isNewAnswer = true
      
      if (response.success) {
        setResult(response.answer);
        setLocalError(null);
        clearAiError();
      } else {
        setLocalError(response.error);
        setResult('');
      }
    } catch (err) {
      setLocalError('AI 답변 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      setResult('');
    }
  }, [question, generateAnswer, clearAiError]);

  const handleCopyAnswer = useCallback(async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        // TODO: 복사 성공 알림 추가
        console.log('답변이 클립보드에 복사되었습니다.');
      } catch (err) {
        console.error('복사 실패:', err);
        // 폴백: 텍스트 선택
        const textArea = document.createElement('textarea');
        textArea.value = result;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    }
  }, [result]);

  const handleRetry = useCallback(() => {
    setLocalError(null);
    clearAiError();
  }, [clearAiError]);

  return (
    <div className="home-page">
      <HamsterRidingAnimation 
        isVisible={aiLoading} 
        onComplete={() => {
          // 애니메이션 완료 후 TMI 표시
        }}
      />
      <div className="home-page__container">
        <header className="home-page__header">
          <h1 className="home-page__title">햄대리</h1>
          <p className="home-page__subtitle">
            헴님만을 바라보는 충성스러운 햄스터에게 뭐든 물어보세요!
          </p>
        </header>

        <HamsterProfile isAnswering={aiLoading} />

        <main className="home-page__main">
          <QuestionForm 
            question={question}
            isValid={isValid}
            validationMessage={validationMessage}
            onChange={handleQuestionChange}
            onSubmit={handleSubmit}
            disabled={aiLoading}
          />

          {aiLoading && (
            <Card className="home-page__loading-card">
              <LoadingSpinner size="large" />
            </Card>
          )}

          {error && (
            <Card variant="outlined" className="home-page__error-card">
              <div className="error-message">
                <p>{error}</p>
                <div className="error-actions">
                  <Button onClick={handleRetry} variant="secondary" size="small">
                    다시 시도
                  </Button>
                  <Button onClick={handleNewQuestion} variant="primary" size="small">
                    새 질문하기
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {result && (
            <>
              <HamsterTMI isVisible={result && !aiLoading} />
              <AnswerDisplay
                answer={result}
                onCopy={handleCopyAnswer}
                onNewQuestion={handleNewQuestion}
                onNewAnswer={handleNewAnswer}
                isLoading={aiLoading}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
