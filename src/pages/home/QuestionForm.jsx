import React from 'react';
import { Card, TextArea, Button } from '@ui/';
import './QuestionForm.css';

const QuestionForm = ({ 
  question, 
  isValid, 
  validationMessage, 
  onChange, 
  onSubmit, 
  disabled = false 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <Card className="question-form">
        <form onSubmit={handleSubmit}>
        <div className="question-form__header">
          <h2 className="question-form__title">헴님! 뭐든 물어보세요!</h2>
          <p className="question-form__description">
            햄대리가 따릉이 타고 달려가서 열심히 답변해드릴게요!
          </p>
        </div>

        <div className="question-form__input-section">
          <TextArea
            value={question}
            onChange={onChange}
            placeholder="예: 헴님! 오늘 점심 뭐 먹을까요? 마라탕이랑 돈까스 중에 뭐가 나을까요?"
            rows={4}
            maxLength={500}
            disabled={disabled}
            onKeyPress={handleKeyPress}
            className={`question-form__textarea ${!isValid ? 'question-form__textarea--error' : ''}`}
          />
          
          {!isValid && validationMessage && (
            <div className="question-form__error">
              <small className="error-text">{validationMessage}</small>
            </div>
          )}
          

        </div>

        <div className="question-form__actions">
          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={!isValid || disabled}
            className="question-form__submit-btn"
          >
            {disabled ? '생성 중...' : '햄대리 출동!'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default QuestionForm;
