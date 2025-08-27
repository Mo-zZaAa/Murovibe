import React from 'react';
import { Card, Button } from '@ui/';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-page">
      <div className="not-found-page__container">
        <div className="not-found-page__content">
          <div className="not-found-page__hamster">
            <div className="not-found-page__hamster-face">
              <div className="not-found-page__hamster-ear not-found-page__hamster-ear--left"></div>
              <div className="not-found-page__hamster-ear not-found-page__hamster-ear--right"></div>
              <div className="not-found-page__hamster-eye not-found-page__hamster-eye--left"></div>
              <div className="not-found-page__hamster-eye not-found-page__hamster-eye--right"></div>
              <div className="not-found-page__hamster-nose"></div>
              <div className="not-found-page__hamster-mouth"></div>
            </div>
          </div>
          
          <Card className="not-found-page__card">
            <div className="not-found-page__text">
              <h1 className="not-found-page__title">404</h1>
              <h2 className="not-found-page__subtitle">헴님! 여기는 없는 곳이에요!</h2>
              <p className="not-found-page__description">
                햄대리가 따릉이 타고 달려가서 찾아봤는데<br />
                요청하신 페이지를 찾을 수 없습니다!!!!!
              </p>
              <p className="not-found-page__tmi">
                🐹 TMI: 햄대리가 지도를 잘못 봐서 길을 잃었어요... 죄송합니다 헴님!!!!!
              </p>
            </div>
            
            <div className="not-found-page__actions">
              <Button 
                variant="primary" 
                size="large" 
                onClick={handleGoHome}
                className="not-found-page__button"
              >
                🏠 홈으로 돌아가기
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
