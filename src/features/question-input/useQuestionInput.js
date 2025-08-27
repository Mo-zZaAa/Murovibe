import { useState, useCallback } from 'react';

const useQuestionInput = () => {
  const [question, setQuestion] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  const validateQuestion = useCallback((input) => {
    if (!input.trim()) {
      setIsValid(false);
      setValidationMessage('헴님! 뭔가 물어보세요!!!!!');
      return false;
    }

    if (input.length < 5) {
      setIsValid(false);
      setValidationMessage('헴님! 좀 더 자세히 말씀해주세요!!!!!');
      return false;
    }

    if (input.length > 500) {
      setIsValid(false);
      setValidationMessage('헴님! 너무 길어요!!!!! 500자 이내로 해주세요!!!!!');
      return false;
    }

    setIsValid(true);
    setValidationMessage('');
    return true;
  }, []);

  const handleQuestionChange = useCallback((e) => {
    const value = e.target.value;
    setQuestion(value);
    validateQuestion(value);
  }, [validateQuestion]);

  const handleQuestionSubmit = useCallback(() => {
    if (validateQuestion(question)) {
      return question.trim();
    }
    return null;
  }, [question, validateQuestion]);

  const clearQuestion = useCallback(() => {
    setQuestion('');
    setIsValid(true);
    setValidationMessage('');
  }, []);

  const reset = useCallback(() => {
    setQuestion('');
    setIsValid(true);
    setValidationMessage('');
  }, []);

  return {
    question,
    isValid,
    validationMessage,
    handleQuestionChange,
    handleQuestionSubmit,
    clearQuestion,
    reset
  };
};

export default useQuestionInput;
