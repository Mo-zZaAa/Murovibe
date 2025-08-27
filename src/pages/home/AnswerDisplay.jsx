import React from 'react';
import { Card, Button, MarkdownRenderer, LoadingSpinner } from '@ui/';
import './AnswerDisplay.css';

const AnswerDisplay = ({ answer, onCopy, onNewQuestion, onNewAnswer, isLoading = false }) => {
  return (
    <Card variant="elevated" className="answer-display">
      <div className="answer-display__header">
        <h3 className="answer-display__title">헴님! 햄대리가 답변해드렸습니다!</h3>
        <div className="answer-display__actions">
          <Button
            onClick={onCopy}
            variant="secondary"
            size="small"
            className="answer-display__copy-btn"
          >
            복사하기
          </Button>
          <Button
            onClick={onNewAnswer}
            variant="success"
            size="small"
            className="answer-display__new-btn"
            disabled={isLoading}
          >
            {isLoading ? '생성 중...' : '또 다른 답변'}
          </Button>
        </div>
      </div>

      <div className="answer-display__content">
        {isLoading ? (
          <div className="answer-display__loading">
            <LoadingSpinner size="medium" />
            <p>헴님! 햄대리가 따릉이 타고 달려가고 있습니다!</p>
          </div>
        ) : (
          <MarkdownRenderer 
            content={answer} 
            className="answer-display__markdown" 
          />
        )}
      </div>

      <div className="answer-display__footer">
        <small className="answer-display__note">
          헴님! 햄대리가 열심히 도와드릴게요! 마음에 안 들면 또 다른 답변 버튼을 눌러주세요!
        </small>
        <div className="answer-display__additional-actions">
          <Button
            onClick={onNewQuestion}
            variant="secondary"
            size="small"
            className="answer-display__new-question-btn"
          >
            새 질문하기
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AnswerDisplay;
