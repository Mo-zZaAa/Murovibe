import React from 'react';
import './HamsterProfile.css';

const HamsterProfile = ({ isAnswering = false }) => {
  return (
    <div className={`hamster-profile ${isAnswering ? 'hamster-profile--answering' : ''}`}>
      <div className="hamster-profile__avatar">
        <img 
          src="/src/assets/햄이직장인 ver.jpg" 
          alt="햄대리 프로필" 
          className="hamster-profile__image"
        />
        {isAnswering && (
          <div className="hamster-profile__status">
            <div className="hamster-profile__pulse"></div>
          </div>
        )}
      </div>
      <div className="hamster-profile__info">
        <h3 className="hamster-profile__name">햄대리</h3>
        <p className="hamster-profile__title">조직 내 서열 2위</p>
        <p className="hamster-profile__subtitle">헴님만을 바라보는 충성스러운 햄스터</p>
      </div>
    </div>
  );
};

export default HamsterProfile;
