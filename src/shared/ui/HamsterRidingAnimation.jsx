import React, { useState, useEffect } from 'react';
import './HamsterRidingAnimation.css';

const HamsterRidingAnimation = ({ isVisible = false, onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      
      // 애니메이션 완료 후 콜백 호출
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (onComplete) {
          onComplete();
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible || !isAnimating) return null;

  return (
    <div className="hamster-riding-animation">
      <div className="hamster-riding-animation__container">
        <div className="hamster-riding-animation__hamster">
          <img 
            src="/src/assets/ChatGPT Image 2025년 8월 27일 오후 12_37_16.png" 
            alt="햄대리 따릉이 타고 달려가기" 
            className="hamster-riding-animation__image"
          />
        </div>
        <div className="hamster-riding-animation__bike">
          <div className="hamster-riding-animation__wheel hamster-riding-animation__wheel--front"></div>
          <div className="hamster-riding-animation__wheel hamster-riding-animation__wheel--back"></div>
          <div className="hamster-riding-animation__frame"></div>
        </div>
        <div className="hamster-riding-animation__trail">
          <div className="hamster-riding-animation__dust"></div>
        </div>
      </div>
      <div className="hamster-riding-animation__text">
        <p>헴님! 따릉이 타고 달려가고 있습니다!</p>
      </div>
    </div>
  );
};

export default HamsterRidingAnimation;
